import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  buildOrderMessage,
  openWhatsApp,
  type OrderItem,
} from "@/lib/whatsapp";
import { toast } from "sonner";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  items: OrderItem[];
  onSuccess?: () => void;
}

export function OrderModal({ open, onClose, items, onSuccess }: OrderModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem("lyvon_customer");
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.name) setName(data.name);
          if (data.mobile) setMobile(data.mobile);
          if (data.address) setAddress(data.address);
        } catch {
          /* ignore */
        }
      }
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your order is empty.");
      return;
    }
    const trimmedName = name.trim();
    const trimmedMobile = mobile.trim();
    const trimmedAddress = address.trim();
    if (!trimmedName || !trimmedMobile || !trimmedAddress) {
      toast.error("Please fill in your name, mobile number, and address.");
      return;
    }
    if (!/^[+\d][\d\s-]{6,}$/.test(trimmedMobile)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }
    setSubmitting(true);
    localStorage.setItem(
      "lyvon_customer",
      JSON.stringify({
        name: trimmedName,
        mobile: trimmedMobile,
        address: trimmedAddress,
      }),
    );
    const message = buildOrderMessage(items, {
      name: trimmedName,
      mobile: trimmedMobile,
      address: trimmedAddress,
      notes: notes.trim(),
    });
    openWhatsApp(message);
    toast.success("Opening WhatsApp to confirm your order...");
    setTimeout(() => {
      setSubmitting(false);
      onSuccess?.();
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-background w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto border shadow-2xl">
              <div className="sticky top-0 z-10 bg-background border-b flex items-center justify-between p-5">
                <div>
                  <h2 className="text-lg md:text-xl font-display uppercase tracking-wider">
                    Place Order via WhatsApp
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Share your details — we'll confirm on WhatsApp.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 border-b bg-muted/30">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-3">
                  Order Summary
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex justify-between text-sm gap-2"
                    >
                      <span className="truncate">
                        {item.product.name}{" "}
                        <span className="text-muted-foreground">
                          · {item.size} · x{item.quantity}
                        </span>
                      </span>
                      <span className="font-medium shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t text-sm font-bold uppercase tracking-wider">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    className="rounded-none h-11 border-gray-300 focus-visible:ring-black dark:focus-visible:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="rounded-none h-11 border-gray-300 focus-visible:ring-black dark:focus-visible:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="House / flat no, street, city, state, pincode"
                    className="rounded-none border-gray-300 min-h-[90px] resize-none focus-visible:ring-black dark:focus-visible:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    Notes <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any size or delivery preference?"
                    className="rounded-none border-gray-300 min-h-[60px] resize-none focus-visible:ring-black dark:focus-visible:ring-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-none text-sm font-bold uppercase tracking-widest bg-[#25D366] text-white hover:bg-[#1ebe57] flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  {submitting ? "Opening WhatsApp..." : "Send Order on WhatsApp"}
                </Button>
                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  Clicking the button will open WhatsApp with your order
                  pre-filled. We'll confirm availability and share payment
                  details.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
