"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 rounded-full bg-danger-light flex items-center justify-center mb-8">
        <AlertCircle className="w-12 h-12 text-danger" />
      </div>
      
      <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Something went wrong!</h1>
      
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        We encountered an unexpected error while processing your request. Our team has been notified.
      </p>
      
      <Button 
        variant="primary" 
        onClick={() => reset()}
        className="gap-2"
      >
        <RefreshCcw className="w-4 h-4" />
        Try again
      </Button>
    </div>
  );
}
