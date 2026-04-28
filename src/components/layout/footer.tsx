import { Link } from "wouter";
import { Instagram } from "lucide-react";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-display tracking-tight mb-6">LYVON</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              Premium monochrome streetwear atelier. Black, white, and bold. Printed in high contrast for maximum statement.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 hover:border-white px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
            >
              <Instagram size={16} />
              Follow {INSTAGRAM_HANDLE}
            </a>
          </div>

          <div>
            <h3 className="font-bold tracking-widest text-sm mb-6 uppercase">Explore</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold tracking-widest text-sm mb-6 uppercase">Connect</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919949045894"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Orders
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} LYVON ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 items-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <Instagram size={14} /> INSTAGRAM
            </a>
            <a
              href="https://wa.me/919949045894"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
