// ==================================================
// Auth Server Actions
// ==================================================

"use server";

import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/features/auth/auth";
import { connectToDatabase } from "@/lib/db/connection";
import User from "@/lib/db/models/User";
import { registerSchema, loginSchema } from "@/validations";
import type { RegisterInput } from "@/validations";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export interface AuthActionState {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

/**
 * Register a new user with email/password.
 * Strategy: create user, then redirect to login with ?registered=true.
 * The login page auto-signs in via the loginAction so we avoid calling
 * signIn() inside a try/catch that swallows the internal NEXT_REDIRECT throw.
 */
export async function registerAction(
  _prevState: AuthActionState | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const rawData: RegisterInput = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as "student" | "owner",
  };

  // Validate
  const result = registerSchema.safeParse(rawData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, password, role } = result.data;

  try {
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: "An account with this email already exists." };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    await User.create({
      name,
      email,
      passwordHash,
      role,
      provider: "credentials",
      status: "active",
      lastLoginAt: new Date(),
    });
  } catch (error) {
    // Let redirect errors propagate (shouldn't happen here but be safe)
    if (isRedirectError(error)) throw error;
    return { message: "Something went wrong. Please try again." };
  }

  // Sign in immediately after registration
  // signIn() internally calls redirect(), so it MUST NOT be inside try/catch
  // that would swallow the redirect. Call it outside the try block.
  await signIn("credentials", {
    email,
    password,
    redirectTo: role === "owner" ? "/dashboard" : "/properties",
  });

  // This line is never reached (signIn redirects), but satisfies TypeScript
  return { success: true };
}

/**
 * Login with email/password.
 */
export async function loginAction(
  _prevState: AuthActionState | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginSchema.safeParse(rawData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Verify credentials manually first so we can return a proper error message
  // before calling signIn (which would throw and lose the error context)
  try {
    await connectToDatabase();
    const user = await User.findOne({
      email: result.data.email,
      provider: "credentials",
    }).select("+passwordHash");

    if (!user || !user.passwordHash) {
      return { message: "Invalid email or password." };
    }

    const isValid = await bcrypt.compare(result.data.password, user.passwordHash);
    if (!isValid) {
      return { message: "Invalid email or password." };
    }

    if (user.status === "suspended") {
      return { message: "Your account has been suspended. Please contact support." };
    }

    // Determine redirect based on role BEFORE calling signIn
    const redirectPath =
      user.role === "admin"
        ? "/admin"
        : user.role === "owner"
          ? "/dashboard"
          : "/properties";

    // signIn throws a NEXT_REDIRECT internally — must NOT be in try/catch
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo: redirectPath,
    });
  } catch (error) {
    // Re-throw redirect errors so Next.js can handle them
    if (isRedirectError(error)) throw error;
    return { message: "Invalid email or password." };
  }

  // Never reached
  return { success: true };
}

/**
 * Login with Google OAuth.
 */
export async function googleLoginAction() {
  await signIn("google", { redirectTo: "/properties" });
}

/**
 * Logout action.
 */
export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
