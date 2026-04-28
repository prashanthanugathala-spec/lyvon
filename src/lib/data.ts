export type Fit = 'Oversized' | 'Regular' | 'Cropped' | 'Polo';
export type Color = 'Black' | 'White' | 'Olive';

export interface Product {
  id: string;
  name: string;
  price: number;
  color: Color;
  fit: Fit;
  description: string;
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  fabric: string;
  care: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "p-01",
    name: "OBSIDIAN BLOCK TEE",
    price: 499,
    color: "Black",
    fit: "Oversized",
    description: "Our signature heavyweight oversized tee featuring a stark white brutalist block print on the chest. Crafted from premium 280gsm cotton for a structured drape.",
    images: ["/images/product-1.png", "/images/product-3.png"],
    isBestSeller: true,
    fabric: "100% Premium Heavyweight Cotton (280gsm)",
    care: "Machine wash cold inside out. Do not tumble dry. Do not iron on print."
  },
  {
    id: "p-02",
    name: "VOID SCRIPT TEE",
    price: 499,
    color: "White",
    fit: "Regular",
    description: "A clean, modern fit with distorted black gothic script across the chest. Minimal silhouette, maximum statement.",
    images: ["/images/product-2.png", "/images/product-6.png"],
    fabric: "100% Combed Cotton (220gsm)",
    care: "Machine wash cold inside out. Do not tumble dry."
  },
  {
    id: "p-03",
    name: "TIGER ROAR TEE",
    price: 499,
    color: "Black",
    fit: "Regular",
    description: "Clean black silhouette with a powerful tiger graphic across the back. Bold from behind, minimal from the front. Built for those who lead with quiet confidence.",
    images: ["/images/product-tiger.png", "/images/product-tiger.png"],
    isNew: true,
    fabric: "100% Premium Cotton (240gsm)",
    care: "Machine wash cold inside out. Do not tumble dry. Do not iron on print."
  },
  {
    id: "p-04",
    name: "ESSENTIAL WHITE POLO",
    price: 499,
    color: "White",
    fit: "Polo",
    description: "Classic white pique polo with contrast black tipping at the collar and cuffs. Smart-casual essential — wear it from the studio to the city.",
    images: ["/images/product-white-polo.jpg", "/images/product-white-polo.jpg"],
    isBestSeller: true,
    fabric: "100% Premium Cotton Pique (220gsm)",
    care: "Machine wash cold. Do not bleach. Iron low heat."
  },
  {
    id: "p-05",
    name: "ESSENTIAL BLACK POLO",
    price: 499,
    color: "Black",
    fit: "Polo",
    description: "All-black pique polo with crisp white tipping. Sharp, structured collar and a tailored body for a refined silhouette.",
    images: ["/images/product-black-polo.jpg", "/images/product-black-polo.jpg"],
    fabric: "100% Premium Cotton Pique (220gsm)",
    care: "Machine wash cold inside out. Do not bleach."
  },
  {
    id: "p-06",
    name: "BUILT FOR PURPOSE TEE",
    price: 499,
    color: "Olive",
    fit: "Oversized",
    description: "Garment-dyed olive heavyweight tee with a bold LYVON 'Built For Purpose' mountain back graphic. Strength is earned in silence — made for discipline, focus, and ambition.",
    images: ["/images/product-built-for-purpose.png", "/images/product-built-for-purpose.png"],
    isNew: true,
    fabric: "100% Heavyweight Cotton (280gsm), Garment Dyed",
    care: "Machine wash cold inside out. Do not tumble dry. Do not iron on print."
  },
];
