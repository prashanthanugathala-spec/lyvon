import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

export default function ProductDetail() {
  const params = useParams();
  const { addToCart, wishlist, toggleWishlist, openOrderModal } = useStore();

  const product = PRODUCTS.find(p => p.id === params.id);
  const relatedProducts = PRODUCTS.filter(p => p.id !== product?.id && (p.color === product?.color || p.fit === product?.fit)).slice(0, 4);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<number>(0);
  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSize("");
    setActiveImage(0);
    setQuantity(1);
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-display text-2xl uppercase gap-6">
        Product Not Found
        <Link href="/shop" className="text-sm tracking-widest underline">Back to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first.");
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size first.");
      return;
    }
    openOrderModal({ product, size: selectedSize, quantity });
  };

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center text-xs text-muted-foreground uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-foreground font-bold">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32">
          <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 w-full md:w-24 shrink-0 overflow-x-auto md:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-[3/4] overflow-hidden shrink-0 w-24 border-2 transition-colors ${activeImage === idx ? 'border-black dark:border-white' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} thumbnail`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 aspect-[3/4] bg-muted relative"
            >
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">{product.name}</h1>
                <button
                  type="button"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
                  }}
                  className="p-2 mt-1"
                >
                  <Heart size={24} className={isWishlisted ? "fill-black dark:fill-white" : ""} />
                </button>
              </div>
              <p className="text-xl font-medium mb-6">₹{product.price.toLocaleString("en-IN")}</p>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold uppercase tracking-widest text-xs">Size</span>
                <span className="text-xs text-muted-foreground">Select your fit</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border flex items-center justify-center text-sm font-bold uppercase transition-all
                      ${selectedSize === size
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        : 'bg-transparent border-gray-300 hover:border-black dark:border-gray-800 dark:hover:border-white'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <span className="font-bold uppercase tracking-widest text-xs block mb-4">Quantity</span>
              <div className="inline-flex items-center border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="px-4 py-2 hover:bg-muted text-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >-</button>
                <span className="px-6 text-sm w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="px-4 py-2 hover:bg-muted text-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >+</button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-12">
              <Button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-14 rounded-none text-sm font-bold uppercase tracking-widest"
              >
                Add To Cart
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleBuyNow}
                className="w-full h-14 rounded-none text-sm font-bold uppercase tracking-widest border-[#25D366] text-[#1ebe57] hover:bg-[#25D366] hover:text-white flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Buy Now on WhatsApp
              </Button>
            </div>

            <Accordion type="multiple" className="w-full">
              <AccordionItem value="details" className="border-b-gray-200 dark:border-b-gray-800">
                <AccordionTrigger className="uppercase font-bold tracking-widest text-xs py-4 hover:no-underline">Fabric & Fit</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>{product.fabric}</li>
                    <li>Fit: {product.fit}</li>
                    <li>Model is 6'1" wearing size L</li>
                    <li>Made in restricted quantities</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care" className="border-b-gray-200 dark:border-b-gray-800">
                <AccordionTrigger className="uppercase font-bold tracking-widest text-xs py-4 hover:no-underline">Care Instructions</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {product.care}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b-gray-200 dark:border-b-gray-800">
                <AccordionTrigger className="uppercase font-bold tracking-widest text-xs py-4 hover:no-underline">Shipping & Delivery</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  Orders are confirmed on WhatsApp. Standard delivery across India in 4-7 business days. Express options shared on confirmation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t pt-24">
            <h2 className="text-3xl font-display uppercase tracking-tight mb-12 text-center">Styled With / Related</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
