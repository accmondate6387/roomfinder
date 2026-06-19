"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/features/auth/auth.actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User, GraduationCap, Building2, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 p-8 md:p-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mx-auto mb-5 border border-violet-200">
          <UserPlus className="w-7 h-7 text-violet-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1.5">Create an account</h1>
        <p className="text-slate-500 text-sm font-medium">Join RoomFinder Prayagraj today</p>
      </div>

      <form action={formAction} className="space-y-5">
        {state?.message && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-bold flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            {state.message}
          </div>
        )}

        <Input
          label="Full Name"
          name="name"
          placeholder="John Doe"
          error={state?.errors?.name?.[0]}
          icon={<User className="w-4 h-4" />}
          required
        />

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
          placeholder="Create a strong password"
          helperText="Must be at least 8 characters with 1 letter and 1 number"
          error={state?.errors?.password?.[0]}
          icon={<Lock className="w-4 h-4" />}
          required
        />

        <div className="space-y-3 pt-1">
          <label className="block text-sm font-bold text-slate-700">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative flex cursor-pointer rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-violet-200 hover:border-violet-300 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-50 has-[:checked]:shadow-md transition-all">
              <input
                type="radio"
                name="role"
                value="student"
                className="sr-only"
                defaultChecked
              />
              <div className="flex w-full items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center shrink-0 has-[:checked]-parent:bg-violet-500">
                  <GraduationCap className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-slate-900">Student</span>
                  <span className="block text-xs font-medium text-slate-500">Looking for room</span>
                </div>
              </div>
            </label>

            <label className="relative flex cursor-pointer rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-violet-200 hover:border-violet-300 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-50 has-[:checked]:shadow-md transition-all">
              <input
                type="radio"
                name="role"
                value="owner"
                className="sr-only"
              />
              <div className="flex w-full items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-slate-900">Owner</span>
                  <span className="block text-xs font-medium text-slate-500">Listing property</span>
                </div>
              </div>
            </label>
          </div>
          {state?.errors?.role && (
            <p className="text-xs font-bold text-rose-600">{state.errors.role[0]}</p>
          )}
        </div>

        <Button type="submit" fullWidth isLoading={pending} size="lg" className="mt-2 rounded-2xl">
          Create Account
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-violet-100">
        <p className="text-center text-sm font-bold text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-violet-600 hover:text-violet-700 transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
