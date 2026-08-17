import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors select-none',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--peach)] text-[var(--terracotta-dark)] border-1.5 border-[var(--navy)] text-[12px] px-3 py-1 rounded-[2px]',
        kicker:
          'bg-[rgba(255,159,67,0.1)] text-[var(--orange-dark)] border border-[rgba(255,159,67,0.4)] text-[11.5px] px-4 py-1.5 rounded-full tracking-[0.18em]',
        darkKicker:
          'bg-[rgba(255,159,67,0.12)] text-[#FF9F43] border border-[rgba(255,159,67,0.35)] text-[9.5px] px-3 py-1 rounded-[2px] tracking-[0.18em]',
        teal:
          'bg-[rgba(83,153,135,0.14)] text-[var(--teal)] text-[10.5px] px-2.5 py-1 rounded-full',
        outline:
          'border border-current text-[11px] px-2.5 py-0.5 rounded-full',
        pill:
          'bg-white text-[var(--navy)] border border-[rgba(15,36,65,0.1)] shadow-[0_10px_22px_-10px_rgba(15,36,65,0.25)] text-[13.5px] px-5 py-3 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
