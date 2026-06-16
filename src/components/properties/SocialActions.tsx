"use client";

import { useState, useTransition } from "react";
import { Heart, Flag } from "lucide-react";
import { toast } from "sonner";
import { toggleFavoriteAction } from "@/features/social/favorites.actions";
import { submitReportAction } from "@/features/social/reports.actions";

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

    // Optimistic update
    setIsFavorited(!isFavorited);

    startTransition(async () => {
      const result = await toggleFavoriteAction(propertyId);
      if (result.error) {
        // Revert on error
        setIsFavorited(isFavorited);
        toast.error(result.error);
      } else {
        toast.success(result.isFavorited ? "Property saved!" : "Property removed from saved.");
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
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
            isFavorited
              ? "bg-rose-50 text-rose-500 border border-rose-100"
              : "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50 hover:text-rose-400"
          }`}
          aria-label="Save property"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
        </button>
        
        <button
          onClick={() => setShowReportModal(true)}
          className="w-12 h-12 rounded-2xl bg-white text-slate-400 border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-danger transition-all shadow-sm"
          aria-label="Report listing"
        >
          <Flag className="w-5 h-5" />
        </button>
      </div>

      {/* Simple Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Report Listing</h3>
            <p className="text-slate-500 text-sm mb-6">Let us know what's wrong with this listing. Our team will investigate.</p>
            
            <form onSubmit={handleReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <select name="reason" required className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select a reason</option>
                  <option value="fake_listing">Fake Listing</option>
                  <option value="scam">Scam / Fraud</option>
                  <option value="inaccurate_info">Inaccurate Information / Photos</option>
                  <option value="offensive">Offensive Content</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Details</label>
                <textarea 
                  name="details" 
                  rows={3} 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Please provide any additional context..."
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-3 rounded-xl bg-danger text-white font-medium hover:bg-danger/90"
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
