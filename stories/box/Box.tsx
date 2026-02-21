import { cn } from '@betday-lite/tailwind-utils';
import React, { forwardRef } from 'react';

type BoxElement =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'main'
  | 'header'
  | 'footer';

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: BoxElement;
  children?: React.ReactNode;
  className?: string;
}

const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', children, className, ...props }, ref) => {
    return (
      <Component
        {...({ ref } as React.HTMLAttributes<HTMLElement>)}
        className={cn(className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';

export default Box;
