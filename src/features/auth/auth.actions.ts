// ==================================================
// Auth Server Actions
// ==================================================

"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/features/auth/auth";
import { connectToDatabase } from "@/lib/db/connection";
import User from "@/lib/db/models/User";
import { registerSchema, loginSchema } from "@/validations";
import type { RegisterInput } from "@/validations";

export interface AuthActionState {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

/**
 * Register a new user with email/password.
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
      lastLoginAt: new Date(),
    });
  } catch {
    return { message: "Something went wrong. Please try again." };
  }

  // Auto sign-in after registration
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch {
    // Sign-in after register failed, redirect to login
    redirect("/login?registered=true");
  }

  // Redirect based on role
  redirect(role === "owner" ? "/dashboard" : "/properties");
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

  try {
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Account suspended") {
      return { message: "Your account has been suspended." };
    }
    return { message: "Invalid email or password." };
  }

  // Get user role for redirect
  await connectToDatabase();
  const user = await User.findOne({ email: result.data.email });
  const redirectPath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "owner"
        ? "/dashboard"
        : "/properties";

  redirect(redirectPath);
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
