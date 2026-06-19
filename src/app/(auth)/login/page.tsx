"use client";

import { useActionState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/features/auth/auth.actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, LogIn } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [state, formAction, pending] = useActionState(loginAction, undefined);

  useEffect(() => {
    if (registered) {
      toast.success("Account created successfully! Please log in.");
    }
  }, [registered]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 p-8 md:p-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mx-auto mb-5 border border-violet-200">
          <LogIn className="w-7 h-7 text-violet-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1.5">Welcome back</h1>
        <p className="text-slate-500 text-sm font-medium">Log in to your RoomFinder account</p>
      </div>

      <form action={formAction} className="space-y-5">
        {state?.message && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-bold flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            {state.message}
          </div>
        )}

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          error={state?.errors?.email?.[0]}
          icon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          error={state?.errors?.password?.[0]}
          icon={<Lock className="w-4 h-4" />}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              name="remember"
              className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-200 cursor-pointer"
            />
            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-700">Remember me</span>
          </label>
          <Link
            href="#"
            className="text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={pending} size="lg" className="rounded-2xl">
          Log In
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-violet-100">
        <p className="text-center text-sm font-bold text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-violet-600 hover:text-violet-700 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 p-8 md:p-10 animate-pulse">
        <div className="h-16 w-16 rounded-2xl bg-violet-100 mx-auto mb-5" />
        <div className="h-7 bg-slate-100 rounded-xl mb-2 w-2/3 mx-auto" />
        <div className="h-5 bg-slate-100 rounded-xl w-1/2 mx-auto" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
