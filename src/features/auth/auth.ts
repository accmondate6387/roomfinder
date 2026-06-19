// ==================================================
// Auth.js (NextAuth v5) Configuration
// ==================================================

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db/connection";
import User from "@/lib/db/models/User";
import { SESSION_MAX_AGE } from "@/lib/constants";
import type { SessionUser } from "@/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectToDatabase();

        const user = await User.findOne({
          email: (credentials.email as string).toLowerCase(),
          provider: "credentials",
        }).select("+passwordHash");

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) {
          return null;
        }

        if (user.status === "suspended") {
          throw new Error("Account suspended");
        }

        // Update last login
        await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectToDatabase();

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          if (existingUser.status === "suspended") {
            return false;
          }
          // Update last login
          await User.findByIdAndUpdate(existingUser._id, {
            lastLoginAt: new Date(),
            image: user.image || existingUser.image,
          });
        } else {
          // Create new user (default role: student)
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            role: "student",
            emailVerified: new Date(),
            lastLoginAt: new Date(),
          });
        }
      }
      return true;
    },

    async jwt({ token, user, trigger }) {
      // On first sign-in OR when session.update() is called, fetch fresh data from DB
      if (user || trigger === "update") {
        await connectToDatabase();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.image = dbUser.image;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as unknown as SessionUser).id = token.id as string;
        (session.user as unknown as SessionUser).role = token.role as SessionUser["role"];
        (session.user as unknown as SessionUser).image = token.image as string | null;
      }
      return session;
    },
  },

  trustHost: true,
});
