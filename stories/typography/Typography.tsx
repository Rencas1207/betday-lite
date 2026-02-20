import type { ElementType, ReactNode } from 'react';
import { cn } from '../tailwind-utils';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'mono';

interface TypographyProps {
  variant: Variant;
  children: ReactNode;
  className?: string;
  italic?: boolean;
  uppercase?: boolean;
}

const styles: Record<Variant, string> = {
  h1: 'text-4xl md:text-5xl font-black tracking-tighter',
  h2: 'text-2xl md:text-3xl font-black tracking-tighter',
  h3: 'text-xl font-black tracking-tight',
  h4: 'text-lg font-bold tracking-tight',
  body: 'text-base font-medium text-slate-600',
  small: 'text-[10px] font-black',
  mono: 'font-mono font-bold'
};

const elementMap: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  small: 'span',
  mono: 'code'
};

const Typography = ({
  variant,
  children,
  className,
  italic = false,
  uppercase = false
}: TypographyProps) => {
  const Component = elementMap[variant];

  return (
    <Component
      className={cn(
        styles[variant],
        italic && 'italic',
        uppercase && 'uppercase',
        className
      )}
    >
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';

export default Typography;
