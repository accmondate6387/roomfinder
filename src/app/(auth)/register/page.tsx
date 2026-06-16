"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/features/auth/auth.actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create an account</h1>
        <p className="text-slate-500">Join RoomFinder Prayagraj today</p>
      </div>

      <form action={formAction} className="space-y-5">
        {state?.message && (
          <div className="p-4 bg-danger-light text-danger rounded-xl text-sm font-medium">
            {state.message}
          </div>
        )}

        <Input
          label="Full Name"
          name="name"
          placeholder="John Doe"
          error={state?.errors?.name?.[0]}
          required
        />

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
          helperText="Must be at least 8 characters with 1 letter and 1 number"
          error={state?.errors?.password?.[0]}
          required
        />

        <div className="space-y-3 pt-2">
          <label className="block text-sm font-medium text-slate-700">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-primary hover:bg-slate-50 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary transition-all">
              <input
                type="radio"
                name="role"
                value="student"
                className="sr-only"
                defaultChecked
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <span className="block text-sm font-medium text-slate-900">Student</span>
                  <span className="block text-xs text-slate-500">Looking for a room</span>
                </div>
              </div>
            </label>

            <label className="relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-primary hover:bg-slate-50 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary transition-all">
              <input
                type="radio"
                name="role"
                value="owner"
                className="sr-only"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <span className="block text-sm font-medium text-slate-900">Owner</span>
                  <span className="block text-xs text-slate-500">Listing a property</span>
                </div>
              </div>
            </label>
          </div>
          {state?.errors?.role && (
            <p className="text-sm text-danger">{state.errors.role[0]}</p>
          )}
        </div>

        <Button type="submit" fullWidth isLoading={pending} size="lg" className="mt-6">
          Create Account
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
