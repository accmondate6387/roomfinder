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
            className="block text-sm font-bold text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={generatedId}
            className={`
              block w-full rounded-2xl border-2 px-4 py-3.5 text-slate-900
              placeholder:text-slate-400 focus:outline-none focus:ring-2
              transition-all duration-200 text-sm font-medium
              ${icon ? "pl-11" : ""}
              ${
                error
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                  : "border-slate-200 focus:border-violet-400 focus:ring-violet-200 hover:border-slate-300"
              }
              ${props.disabled ? "bg-slate-50 text-slate-500 cursor-not-allowed" : "bg-white"}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs font-bold text-rose-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-xs font-medium text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
