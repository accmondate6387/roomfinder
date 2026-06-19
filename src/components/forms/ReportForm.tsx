"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReportSchema, CreateReportInput } from "@/validations";
import { submitReportAction } from "@/features/reports/reports.actions";
import { Button } from "../ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface ReportFormProps {
  propertyId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const REASONS = [
  { value: "fraud", label: "Fraud or Scam" },
  { value: "wrong-photos", label: "Wrong Photos" },
  { value: "incorrect-price", label: "Incorrect Price" },
  { value: "already-occupied", label: "Already Occupied" },
  { value: "misleading", label: "Misleading Information" },
];

export function ReportForm({ propertyId, onSuccess, onCancel }: ReportFormProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateReportInput>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      propertyId,
      reason: "misleading",
      description: "",
    },
  });

  const onSubmit = async (data: CreateReportInput) => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role !== "student") {
      setError("Only students can report listings.");
      return;
    }

    setError(null);
    const result = await submitReportAction(data);

    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || "Failed to submit report");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="reason" className="text-sm font-bold text-slate-700">
          Reason for reporting
        </label>
        <select
          id="reason"
          {...register("reason")}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 text-sm font-medium"
        >
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {errors.reason && <p className="text-sm font-bold text-rose-500">{errors.reason.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-bold text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 text-sm font-medium resize-none"
          placeholder="Please provide more details about why you are reporting this listing..."
        />
        {errors.description && <p className="text-sm font-bold text-rose-500">{errors.description.message}</p>}
      </div>

      {error && <p className="text-sm font-bold text-rose-500 p-4 bg-rose-50 rounded-2xl border border-rose-200">{error}</p>}

      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="rounded-2xl font-extrabold">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="rounded-2xl font-extrabold">
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
      </div>
    </form>
  );
}
