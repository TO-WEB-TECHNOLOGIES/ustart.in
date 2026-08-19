import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'faq-item bg-[var(--paper-bright)] border-2 border-[var(--navy)] rounded-md overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(15,36,65,0.28)]',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    qTag?: string;
  }
>(({ className, children, qTag, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex m-0 p-0">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'faq-q w-full flex items-center justify-between gap-3.5 p-[18px_20px] text-left font-bold text-[16.5px] tracking-[-0.005em] bg-transparent text-[var(--navy)] border-none cursor-pointer transition-all [&[data-state=open]_.chev]:rotate-45',
        className
      )}
      {...props}
    >
      <span className="flex items-center">
        {qTag && <span className="qtag text-[11px] text-[var(--orange-dark)] font-bold mr-2.5">{qTag}</span>}
        {children}
      </span>
      <span className="chev text-[18px] text-[var(--navy)] flex-shrink-0 transition-transform duration-300 font-normal select-none">
        +
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('faq-a-inner p-[0_20px_20px_20px] text-[14.5px] leading-[1.6] text-[var(--slate)] font-normal', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
