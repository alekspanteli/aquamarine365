'use client';

import { Accordion as AccordionPrimitive } from 'radix-ui';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

function AccordionItem({ className, ref, ...props }) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn('border-b border-[var(--line)]', className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ref, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          'group flex flex-1 items-center justify-between gap-6 py-6 md:py-7 text-left',
          'hover:text-[var(--accent)] transition-colors outline-none focus-visible:text-[var(--accent)]',
          className
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className={cn(
            'inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--line)] text-[var(--fg)] shrink-0',
            'transition-all duration-300',
            'group-data-[state=open]:bg-[var(--fg)] group-data-[state=open]:text-[var(--bg)] group-data-[state=open]:border-[var(--fg)] group-data-[state=open]:rotate-45'
          )}
        >
          <Plus size={16} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ref, ...props }) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className={cn(
        'overflow-hidden',
        'data-[state=open]:animate-[aq-acc-down_0.3s_cubic-bezier(0.22,1,0.36,1)]',
        'data-[state=closed]:animate-[aq-acc-up_0.25s_cubic-bezier(0.22,1,0.36,1)]',
        className
      )}
      {...props}
    >
      <div className="pb-7">{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
