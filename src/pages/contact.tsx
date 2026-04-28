import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Instagram, MessageCircle } from "lucide-react";
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  buildContactMessage,
  openWhatsApp,
  WHATSAPP_NUMBER,
} from "@/lib/whatsapp";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Order Support");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    setIsSubmitting(true);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const text = buildContactMessage({
      name: fullName,
      email: email.trim(),
      inquiryType,
      message: message.trim(),
    });
    openWhatsApp(text);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Opening WhatsApp to send your message...");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setInquiryType("Order Support");
    }, 600);
  };

  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">

        <div className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-display uppercase tracking-tight mb-6"
          >
            Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Order support, sizing, press inquiries — we reply on WhatsApp.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-display uppercase mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">First Name</label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="rounded-none border-gray-300 h-12 focus-visible:ring-black dark:focus-visible:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Last Name</label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-none border-gray-300 h-12 focus-visible:ring-black dark:focus-visible:ring-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Email Address</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="rounded-none border-gray-300 h-12 focus-visible:ring-black dark:focus-visible:ring-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Inquiry Type</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="flex h-12 w-full border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-none"
                >
                  <option>Order Support</option>
                  <option>Custom T-Shirt Design</option>
                  <option>Sizing & Fit</option>
                  <option>Press / Editorial</option>
                  <option>Wholesale</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="rounded-none border-gray-300 min-h-[150px] resize-none focus-visible:ring-black dark:focus-visible:ring-white"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-none text-sm font-bold uppercase tracking-widest bg-[#25D366] text-white hover:bg-[#1ebe57] flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                {isSubmitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
              </Button>
            </form>
          </div>

          <div className="w-full md:w-1/2 space-y-12">
            <div>
              <h2 className="text-2xl font-display uppercase mb-6">Reach Us</h2>
              <div className="space-y-5">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 border border-gray-300 hover:border-black p-4 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                    <p className="font-medium group-hover:underline">+91 99490 45894</p>
                  </div>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 border border-gray-300 hover:border-black p-4 transition-colors group"
                >
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Instagram — New Drops</p>
                    <p className="font-medium group-hover:underline">{INSTAGRAM_HANDLE}</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4">FAQ</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Orders are confirmed on WhatsApp after we receive your details.</li>
                <li>Standard delivery across India: 4-7 business days.</li>
                <li>Returns accepted within 7 days of delivery for unworn pieces.</li>
                <li>Size guide and fit advice available — message us.</li>
                <li><strong className="text-foreground">Custom prints:</strong> Send your own design via WhatsApp and we'll print it on a premium LYVON tee.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
