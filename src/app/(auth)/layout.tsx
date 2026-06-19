import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50 flex flex-col">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-violet-400 rounded-full blur-sm" />

      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-violet-700 transition-all bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-slate-100 hover:border-violet-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-violet-200 group-hover:scale-110 transition-all duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">
                RoomFinder
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
