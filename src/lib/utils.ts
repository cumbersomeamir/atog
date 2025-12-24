import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency: string = "AED"): string {
  if (price >= 1000000) {
    return `${currency} ${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `${currency} ${(price / 1000).toFixed(0)}K`;
  }
  return `${currency} ${price.toLocaleString()}`;
}

export function formatPriceRange(min: number, max: number, currency: string = "AED"): string {
  return `${formatPrice(min, currency)} - ${formatPrice(max, currency)}`;
}

export function formatArea(area: number, unit: "sqft" | "sqm" = "sqft"): string {
  return `${area.toLocaleString()} ${unit}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    apartment: "Apartment",
    villa: "Villa",
    townhouse: "Townhouse",
    penthouse: "Penthouse",
    studio: "Studio",
    duplex: "Duplex",
    land: "Land",
    commercial: "Commercial",
  };
  return labels[type] || type;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    ready: "Ready to Move",
    "off-plan": "Off-Plan",
    "under-construction": "Under Construction",
  };
  return labels[status] || status;
}

export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function generateEmailLink(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function generatePhoneLink(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function calculateROI(purchasePrice: number, annualRent: number): number {
  return (annualRent / purchasePrice) * 100;
}

export function calculateMortgage(
  principal: number,
  annualRate: number,
  years: number
): { monthlyPayment: number; totalPayment: number; totalInterest: number } {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;
  
  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
  };
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

