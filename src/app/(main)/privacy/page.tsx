import { Shield, Sparkles } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="w-full">
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 gradient-bg-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.15),transparent_50%)]" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold mb-6 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-amber-400" />
            Legal
          </span>
          <h1 className="section-heading text-white mb-4 text-5xl">Privacy Policy</h1>
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
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">1. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                We collect information that you provide directly to us when you create an account, fill out your profile, submit a listing, or contact support. This may include your name, email address, phone number, and ID verification documents (for owners).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed font-medium mb-4">We use the information we collect to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 font-medium text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />Provide, maintain, and improve our services.</li>
                <li className="flex items-start gap-3 font-medium text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />Verify the identity of property owners to ensure safety.</li>
                <li className="flex items-start gap-3 font-medium text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />Communicate with you regarding your account, listings, or inquiries.</li>
                <li className="flex items-start gap-3 font-medium text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />Analyze usage patterns to enhance user experience.</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">3. Data Security</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Verification documents are stored securely and automatically deleted after the verification process is complete.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">4. Sharing of Information</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                We do not sell your personal information. We may share information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">5. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@roomfinder.in" className="text-violet-600 underline font-extrabold hover:text-violet-800">support@roomfinder.in</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
