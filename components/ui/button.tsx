import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ComponentProps } from 'react';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

const buttonVariants = cva('button', {
  variants: { variant: { default: 'button-primary', outline: 'button-outline' } },
  defaultVariants: { variant: 'default' },
});

export function Button({ className, variant, type = 'button', ...props }: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return <button type={type} className={cn(buttonVariants({ variant }), className)} {...props} />;
}
