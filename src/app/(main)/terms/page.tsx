import { FileText, Sparkles } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="w-full">
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 gradient-bg-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.12),transparent_50%)]" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold mb-6 backdrop-blur-sm">
            <FileText className="w-4 h-4 text-amber-400" />
            Legal
          </span>
          <h1 className="section-heading text-white mb-4 text-5xl">Terms of Service</h1>
          <p className="text-lg text-slate-300 font-medium">Last updated: June 13, 2026</p>
        </div>
      </section>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 -mt-12 md:-mt-16 relative z-10 pb-24 max-w-4xl">
        <div className="bg-white rounded-3xl border border-violet-100 p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                By accessing or using RoomFinder Prayagraj, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">2. User Accounts</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">3. Property Listings</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Owners are solely responsible for the accuracy of their property listings. We reserve the right to remove any listing that violates our policies, contains misleading information, or receives multiple reports of fraud.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">4. Prohibited Activities</h2>
              <p className="text-slate-600 leading-relaxed font-medium mb-4">You agree not to engage in any of the following prohibited activities:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 font-medium text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />Copying, distributing, or disclosing any part of the service in any medium.</li>
                <li className="flex items-start gap-3 font-medium text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />Using any automated system to access the service.</li>
                <li className="flex items-start gap-3 font-medium text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />Attempting to interfere with the servers or networks connected to the service.</li>
                <li className="flex items-start gap-3 font-medium text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />Posting false, inaccurate, or misleading information.</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">5. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                RoomFinder acts as a platform connecting students with property owners. We do not own or manage the properties listed and are not responsible for any disputes, damages, or losses arising from lease agreements or interactions between users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
