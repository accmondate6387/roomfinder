"use client";

import { useState, useTransition } from "react";
import { Heart, Flag, X } from "lucide-react";
import { toast } from "sonner";
import { toggleFavoriteAction } from "@/features/social/favorites.actions";
import { submitReportAction } from "@/features/social/reports.actions";
import { Button } from "@/components/ui/Button";

interface SocialActionsProps {
  propertyId: string;
  initialIsFavorited: boolean;
  isLoggedIn: boolean;
}

export function SocialActions({ propertyId, initialIsFavorited, isLoggedIn }: SocialActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleFavorite = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to save properties.");
      return;
    }
    setIsFavorited(!isFavorited);
    startTransition(async () => {
      const result = await toggleFavoriteAction(propertyId);
      if (result.error) {
        setIsFavorited(isFavorited);
        toast.error(result.error);
      } else {
        toast.success(result.isFavorited ? "Property saved!" : "Removed from saved.");
      }
    });
  };

  const handleReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please log in to report listings.");
      return;
    }
    const formData = new FormData(e.currentTarget);
    formData.append("propertyId", propertyId);
    const result = await submitReportAction(null, formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      setShowReportModal(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleFavorite}
          disabled={isPending}
          className={`p-2.5 rounded-2xl flex items-center justify-center transition-all ${
            isFavorited
              ? "bg-rose-500/20 text-rose-500"
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20"
          }`}
          aria-label="Save property"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={() => setShowReportModal(true)}
          className="p-2.5 rounded-2xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20 flex items-center justify-center transition-all"
          aria-label="Report listing"
        >
          <Flag className="w-5 h-5" />
        </button>
      </div>

      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-scale-in border border-violet-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-extrabold text-slate-900">Report Listing</h3>
              <button onClick={() => setShowReportModal(false)} className="p-1.5 rounded-xl hover:bg-violet-50 text-slate-400 hover:text-slate-600 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-6 font-medium">Let us know what&apos;s wrong with this listing. Our team will investigate.</p>

            <form onSubmit={handleReport} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Reason</label>
                <select name="reason" required className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400">
                  <option value="">Select a reason</option>
                  <option value="fake_listing">Fake Listing</option>
                  <option value="scam">Scam / Fraud</option>
                  <option value="inaccurate_info">Inaccurate Information / Photos</option>
                  <option value="offensive">Offensive Content</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Additional Details</label>
                <textarea
                  name="details"
                  rows={3}
                  className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 resize-none"
                  placeholder="Please provide any additional context..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-slate-200 font-extrabold text-sm text-slate-600 hover:bg-violet-50 hover:border-violet-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-extrabold text-sm hover:from-rose-700 hover:to-pink-700 transition-all shadow-md"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
