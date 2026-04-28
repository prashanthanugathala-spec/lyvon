import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { ShoppingBag, Menu, X, Instagram, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { INSTAGRAM_URL } from "@/lib/whatsapp";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    openOrderModal,
  } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const transparent = location === "/" && !scrolled;

  const navLinks = [
    { name: "SHOP", path: "/shop" },
    { name: "LOOKBOOK", path: "/lookbook" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || location !== "/" ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-border/50 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex-1 md:hidden">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 ${transparent ? "text-white" : "text-foreground"}`}
            >
              <Menu size={24} />
            </button>
          </div>

          <nav className="hidden md:flex flex-1 items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className={`text-sm font-medium tracking-widest transition-colors hover:opacity-70 ${transparent ? "text-white" : "text-foreground"}`}>
                {link.name}
              </Link>
            ))}
          </nav>

          <Link href="/" className={`text-3xl md:text-4xl font-display tracking-tight hover:opacity-80 transition-opacity ${transparent ? "text-white" : "text-foreground"}`}>
            LYVON
          </Link>

          <div className="flex-1 flex justify-end items-center gap-1 sm:gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LYVON on Instagram"
              className={`p-2 flex items-center justify-center transition-transform hover:scale-110 ${transparent ? "text-white" : "text-foreground"}`}
            >
              <Instagram size={20} />
            </a>
            <button
              type="button"
              aria-label="Open cart"
              className={`relative p-2 flex items-center justify-center transition-transform hover:scale-105 ${transparent ? "text-white" : "text-foreground"}`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background text-foreground flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <span className="text-2xl font-display tracking-tight">LYVON</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-8 gap-8 text-2xl font-display">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">
                  {link.name}
                </Link>
              ))}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-70 transition-opacity flex items-center gap-3 text-xl"
              >
                <Instagram size={22} /> INSTAGRAM
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-[70] flex flex-col border-l"
            >
              <div className="p-6 flex justify-between items-center border-b">
                <h2 className="text-xl font-display tracking-wide uppercase">Your Cart ({cartItemsCount})</h2>
                <button
                  type="button"
                  aria-label="Close cart"
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p className="font-medium tracking-wide uppercase">Your cart is empty</p>
                    <Button
                      variant="outline"
                      className="mt-4 rounded-none"
                      onClick={() => { setCartOpen(false); setLocation("/shop"); }}
                    >
                      CONTINUE SHOPPING
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                        <div className="w-24 aspect-[3/4] bg-muted relative overflow-hidden">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-sm uppercase tracking-wider">{item.product.name}</h3>
                              <p className="text-muted-foreground text-xs mt-1">Size: {item.size}</p>
                            </div>
                            <span className="font-medium">₹{item.product.price.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="mt-auto flex justify-between items-center">
                            <div className="flex items-center border">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                className="px-3 py-1 hover:bg-muted"
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              >-</button>
                              <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                className="px-3 py-1 hover:bg-muted"
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              >+</button>
                            </div>
                            <button
                              type="button"
                              className="text-xs underline text-muted-foreground hover:text-foreground"
                              onClick={() => removeFromCart(item.product.id, item.size)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t bg-muted/20">
                  <div className="flex justify-between mb-4 font-bold uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">
                    Orders are confirmed on WhatsApp. Shipping calculated on confirmation.
                  </p>
                  <Button
                    type="button"
                    onClick={() => { setCartOpen(false); openOrderModal(); }}
                    className="w-full rounded-none h-14 text-sm font-bold tracking-widest uppercase bg-[#25D366] text-white hover:bg-[#1ebe57] flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Order on WhatsApp
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
