
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, format, parseISO, isPast } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateDistance(dateString: string): string {
  const date = parseISO(dateString);
  if (isPast(date)) {
    return 'Campaign ended';
  }
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
}
