import { forwardRef } from 'react';

interface MaterialSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const MaterialSelect = forwardRef<HTMLSelectElement, MaterialSelectProps>(
  ({ label, error, required, children, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={`peer w-full px-4 pt-6 pb-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] rounded-lg
            focus:outline-none focus:border-[#39b54a] focus:ring-1 focus:ring-[#39b54a]
            transition-all duration-200 appearance-none
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}
            ${className}`}
        >
          {children}
        </select>
        <label
          className="absolute left-4 top-2 text-xs text-[#a3a3a3] pointer-events-none
            peer-focus:text-[#39b54a]"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#a3a3a3]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

MaterialSelect.displayName = 'MaterialSelect';
