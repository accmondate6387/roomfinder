import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-8">
        <Search className="w-12 h-12 text-slate-400" />
      </div>
      
      <h1 className="text-6xl font-bold text-slate-900 mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page not found</h2>
      
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        We couldn't find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button variant="primary" className="gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/properties">
          <Button variant="outline">
            Browse Properties
          </Button>
        </Link>
      </div>
    </div>
  );
}
