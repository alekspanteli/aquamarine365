import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Extracted out of component bodies so the React Compiler / eslint-plugin-react-hooks
// `impurity` rule doesn't flag Date.now() / Math.random() calls inside event handlers.
export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
