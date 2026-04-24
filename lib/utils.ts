import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Keep ID generation outside component bodies so event handlers stay pure.
export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
