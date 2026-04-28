import { Product } from "./data";

export const WHATSAPP_NUMBER = "919949045894";
export const INSTAGRAM_URL = "https://www.instagram.com/lyvon.fashions/";
export const INSTAGRAM_HANDLE = "@lyvon.fashions";

export interface OrderItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  mobile: string;
  address: string;
  notes?: string;
}

function formatINR(amount: number) {
  return `\u20B9${amount.toLocaleString("en-IN")}`;
}

export function buildOrderMessage(
  items: OrderItem[],
  customer: CustomerDetails,
): string {
  const lines: string[] = [];
  lines.push("*New LYVON Order*");
  lines.push("");
  lines.push("*Customer Details*");
  lines.push(`Name: ${customer.name}`);
  lines.push(`Mobile: ${customer.mobile}`);
  lines.push(`Address: ${customer.address}`);
  if (customer.notes && customer.notes.trim().length > 0) {
    lines.push(`Notes: ${customer.notes}`);
  }
  lines.push("");
  lines.push("*Order Items*");
  let subtotal = 0;
  items.forEach((item, idx) => {
    const lineTotal = item.product.price * item.quantity;
    subtotal += lineTotal;
    lines.push(
      `${idx + 1}. ${item.product.name} (${item.product.color} / ${item.product.fit})`,
    );
    lines.push(
      `   Size: ${item.size} | Qty: ${item.quantity} | ${formatINR(item.product.price)} = ${formatINR(lineTotal)}`,
    );
  });
  lines.push("");
  lines.push(`*Total: ${formatINR(subtotal)}*`);
  lines.push("");
  lines.push("Please confirm availability and share payment details.");
  return lines.join("\n");
}

export function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function buildContactMessage(payload: {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}): string {
  const lines: string[] = [];
  lines.push("*LYVON Inquiry*");
  lines.push("");
  lines.push(`Name: ${payload.name}`);
  lines.push(`Email: ${payload.email}`);
  lines.push(`Type: ${payload.inquiryType}`);
  lines.push("");
  lines.push("*Message*");
  lines.push(payload.message);
  return lines.join("\n");
}
