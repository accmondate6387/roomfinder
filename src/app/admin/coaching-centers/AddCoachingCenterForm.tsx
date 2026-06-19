"use client";

import { useActionState } from "react";
import { addCoachingCenterAction } from "@/features/admin/admin.actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function AddCoachingCenterForm() {
  const [state, formAction, pending] = useActionState(addCoachingCenterAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      {state?.message && (
        <p className={`text-sm font-bold px-4 py-2.5 rounded-xl border ${state.success ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
          {state.message}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Name *" name="name" placeholder="e.g. Drishti IAS" error={state?.errors?.name?.[0]} required />
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Category *</label>
          <select name="category" className="block w-full rounded-2xl border-2 border-slate-200 px-4 py-3.5 text-sm font-medium bg-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all" required>
            <option value="">Select</option>
            {["upsc","pcs","ssc","jee","neet","other"].map(c => (
              <option key={c} value={c}>{c.toUpperCase()}</option>
            ))}
          </select>
          {state?.errors?.category?.[0] && <p className="mt-1 text-xs font-bold text-rose-600">{state.errors.category[0]}</p>}
        </div>
        <Input label="Address *" name="address" placeholder="e.g. Civil Lines, Prayagraj" error={state?.errors?.address?.[0]} required />
        <Input label="Latitude *" name="latitude" type="number" step="any" placeholder="25.4358" error={state?.errors?.latitude?.[0]} required />
        <Input label="Longitude *" name="longitude" type="number" step="any" placeholder="81.8463" error={state?.errors?.longitude?.[0]} required />
      </div>
      <Button type="submit" isLoading={pending} size="md" className="rounded-2xl">
        Add Coaching Center
      </Button>
    </form>
  );
}
