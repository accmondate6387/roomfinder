import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, icon, id, ...props }, ref) => {
    const generatedId = id || Math.random().toString(36).substring(7);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={generatedId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={generatedId}
            className={`
              block w-full rounded-xl border px-4 py-3 text-slate-900 
              placeholder:text-slate-400 focus:outline-none focus:ring-2 
              transition-all duration-200
              ${icon ? "pl-10" : ""}
              ${
                error
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-slate-200 focus:border-primary focus:ring-primary/20 hover:border-slate-300"
              }
              ${props.disabled ? "bg-slate-50 text-slate-500 cursor-not-allowed" : "bg-white"}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
