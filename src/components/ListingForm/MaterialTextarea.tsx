import { forwardRef } from 'react';

interface MaterialTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export const MaterialTextarea = forwardRef<HTMLTextAreaElement, MaterialTextareaProps>(
  ({ label, error, required, helperText, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          {...props}
          placeholder=" "
          className={`peer w-full px-4 pt-6 pb-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] rounded-lg
            focus:outline-none focus:border-[#39b54a] focus:ring-1 focus:ring-[#39b54a]
            transition-all duration-200 resize-none
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}
            ${className}`}
        />
        <label
          className={`absolute left-4 top-4 text-[#a3a3a3] transition-all duration-200 pointer-events-none
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#39b54a]
            peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs
            ${error ? 'peer-focus:text-red-400' : ''}`}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {helperText && !error && (
          <p className="mt-1 text-xs text-[#a3a3a3]">{helperText}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

MaterialTextarea.displayName = 'MaterialTextarea';
