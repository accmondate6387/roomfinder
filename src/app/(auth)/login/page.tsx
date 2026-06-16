"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/features/auth/auth.actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [state, formAction, pending] = useActionState(loginAction, undefined);

  useEffect(() => {
    if (registered) {
      toast.success("Account created successfully! Please log in.");
    }
  }, [registered]);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
        <p className="text-slate-500">Log in to your RoomFinder account</p>
      </div>

      <form action={formAction} className="space-y-5">
        {state?.message && (
          <div className="p-4 bg-danger-light text-danger rounded-xl text-sm font-medium">
            {state.message}
          </div>
        )}

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          error={state?.errors?.email?.[0]}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          error={state?.errors?.password?.[0]}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={pending} size="lg">
          Log In
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
