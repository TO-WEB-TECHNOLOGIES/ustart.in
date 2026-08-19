import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--navy)] text-[var(--paper-bright)] border-2 border-[var(--navy)] shadow-[3px_3px_0_var(--orange)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--orange)]',
        primary:
          'bg-[var(--orange)] text-[var(--navy)] border-2 border-[var(--navy)] shadow-[3px_3px_0_var(--navy)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--navy)]',
        gold:
          'bg-gradient-to-br from-[var(--gold-bright)] via-[var(--gold)] to-[var(--gold-dark)] text-[var(--navy)] font-extrabold shadow-[0_14px_30px_-10px_rgba(232,194,106,0.55)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-8px_rgba(232,194,106,0.6)]',
        outline:
          'bg-transparent text-[var(--navy)] border-2 border-[var(--navy)] hover:bg-[var(--navy)] hover:text-[var(--paper-bright)] hover:-translate-y-0.5',
        secondary:
          'bg-[var(--peach)] text-[var(--navy)] border-2 border-[var(--navy)] hover:bg-[var(--orange)] hover:-translate-y-0.5',
        ghost:
          'bg-transparent text-[var(--navy)] hover:bg-black/5',
        link:
          'text-[var(--navy)] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-12 px-6 py-3 text-[15px] rounded-lg',
        sm: 'h-9 px-3.5 text-xs rounded-md',
        lg: 'h-14 px-8 text-[16.5px] rounded-xl',
        pill: 'h-11 px-6 text-sm rounded-full',
        icon: 'h-10 w-10 rounded-lg p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
