import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Replacement for the old hlm function from @spartan-ng/ui-core
 */
export function hlm(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
