import { Product } from "@/lib/data";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index: number;
}

const QUICK_SIZES = ["S", "M", "L", "XL"];

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useStore();
  const [showSizes, setShowSizes] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (size: string) => {
    addToCart(product, size, 1);
    setShowSizes(false);
    setJustAdded(true);
    toast.success(`${product.name} (Size ${size}) added to cart`);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className="group flex flex-col"
    >
      <div className="relative">
        <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] overflow-hidden bg-muted mb-4 cursor-pointer">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">New</span>
            )}
            {product.isBestSeller && (
              <span className="bg-white text-black border border-black/10 text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Best Seller</span>
            )}
          </div>
        </Link>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-2 bottom-6 flex flex-col items-stretch pointer-events-none">
          {showSizes ? (
            <div
              className="pointer-events-auto bg-white text-black grid grid-cols-4 gap-px p-px shadow-lg"
              onMouseLeave={() => setShowSizes(false)}
            >
              {QUICK_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleQuickAdd(size);
                  }}
                  className="bg-white hover:bg-black hover:text-white py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSizes(true);
              }}
              className="pointer-events-auto opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity bg-black text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black border border-black flex items-center justify-center gap-2"
            >
              {justAdded ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={14} /> Add to Cart
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center text-center px-2">
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-bold text-sm tracking-widest uppercase mb-1">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2">{product.color} / {product.fit}</p>
        <p className="font-medium mb-3">₹{product.price.toLocaleString("en-IN")}</p>

        {/* Mobile-friendly Add to Cart (always visible) */}
        <div className="md:hidden w-full">
          {showSizes ? (
            <div className="grid grid-cols-4 gap-1 w-full">
              {QUICK_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleQuickAdd(size)}
                  className="border border-black bg-white hover:bg-black hover:text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowSizes(true)}
              className="w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {justAdded ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={14} /> Add to Cart
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
