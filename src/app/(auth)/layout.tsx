import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-primary/10 to-indigo-50/50 -skew-y-6 transform origin-top-left -z-10" />
      
      {/* Back button */}
      <div className="container mx-auto p-4 md:p-8 relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
