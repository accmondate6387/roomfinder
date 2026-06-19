"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerVerificationSchema, OwnerVerificationInput } from "@/validations";
import { submitVerificationAction } from "@/features/owner/owner.actions";
import { Button } from "../ui/Button";

async function uploadToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    publicId: "sample_id_" + Date.now(),
  };
}

export function VerificationForm() {
  const [error, setError] = useState<string | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [propertyFile, setPropertyFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OwnerVerificationInput>({
    resolver: zodResolver(ownerVerificationSchema),
    defaultValues: {
      idProofType: "aadhaar",
      phone: "",
    },
  });

  const onSubmit = async (data: OwnerVerificationInput) => {
    if (!idFile) {
      setError("Please upload an ID proof document.");
      return;
    }

    try {
      setError(null);
      
      const idUpload = await uploadToCloudinary(idFile);
      
      let propertyUpload = null;
      if (propertyFile) {
        propertyUpload = await uploadToCloudinary(propertyFile);
      }

      const result = await submitVerificationAction({
        ...data,
        idProofUrl: idUpload.url,
        idProofPublicId: idUpload.publicId,
        ...(propertyUpload ? {
          propertyProofUrl: propertyUpload.url,
          propertyProofPublicId: propertyUpload.publicId
        } : {})
      });

      if (!result.success) {
        setError(result.error || "Failed to submit verification");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during submission");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="idProofType" className="text-sm font-bold text-slate-700">
            ID Proof Type *
          </label>
          <select
            id="idProofType"
            {...register("idProofType")}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 text-sm font-medium"
          >
            <option value="aadhaar">Aadhaar Card</option>
            <option value="pan">PAN Card</option>
            <option value="voter-id">Voter ID</option>
            <option value="driving-license">Driving License</option>
          </select>
          {errors.idProofType && <p className="text-sm font-bold text-rose-500">{errors.idProofType.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-bold text-slate-700">
            WhatsApp Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 9876543210"
            {...register("phone")}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 text-sm font-medium"
          />
          <p className="text-xs font-bold text-slate-500">Students will use this number to contact you.</p>
          {errors.phone && <p className="text-sm font-bold text-rose-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">
          Upload ID Proof Document *
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => setIdFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-2xl file:border-0 file:text-sm file:font-extrabold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer file:shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">
          Upload Property Ownership Proof (Optional)
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => setPropertyFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-2xl file:border-0 file:text-sm file:font-extrabold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer file:shadow-sm"
        />
        <p className="text-xs font-bold text-slate-500">E.g., Electricity bill, tax receipt. Speeds up property verification.</p>
      </div>

      {error && <p className="text-sm font-bold text-rose-500 p-4 bg-rose-50 rounded-2xl border border-rose-200">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto min-w-[200px] rounded-2xl">
        {isSubmitting ? "Submitting..." : "Submit Verification"}
      </Button>
    </form>
  );
}
