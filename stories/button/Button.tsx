import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../tailwind-utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-500',
        dark: 'bg-slate-900 text-white hover:bg-slate-800',
        outline:
          'border-2 border-slate-200 text-slate-900 hover:border-slate-900 bg-transparent',
        ghost: 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
      },
      size: {
        default: 'h-12 px-8',
        sm: 'h-9 px-4',
        lg: 'h-14 px-10 text-sm',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
