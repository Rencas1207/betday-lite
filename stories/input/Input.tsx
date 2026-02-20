import type { LucideIcon } from 'lucide-react';
import { forwardRef, isValidElement, useId } from 'react';
import { cn } from '../tailwind-utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, className, ...props }, ref) => {
    const inputId = useId();
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="ml-1 text-[10px] font-black tracking-widest text-slate-400 uppercase"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <>
              {isValidElement(Icon) ? (
                Icon
              ) : (
                <Icon
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              )}
            </>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-900 transition-all outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 disabled:cursor-not-allowed disabled:opacity-50',
              Icon && 'pl-12',
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
