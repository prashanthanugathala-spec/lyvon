import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const featuredProducts = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <img
            src="/images/hero.png"
            alt="LYVON High Fashion Editorial"
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Wear the Contrast
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display uppercase tracking-tight leading-none mb-8">
              LYVON
              <br />COLLECTION
            </h1>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-black text-white overflow-hidden py-4 border-y border-white/10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="whitespace-nowrap flex whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-sm font-bold tracking-[0.2em] uppercase mx-8"
            >
              BLACK. WHITE. BOLD. / MINIMAL COLOR. MAXIMUM STATEMENT. /
            </span>
          ))}
        </motion.div>
      </div>

      {/* Statement Section */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-5xl font-display leading-tight uppercase"
        >
          We don't do color. We do{" "}
          <span className="text-muted-foreground">contrast</span>. Every garment
          is a stark collision of light and dark, designed for those who let the
          silhouette speak.
        </motion.p>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-display uppercase">
              The Essentials
            </h2>
            <Link
              href="/shop"
              className="text-sm font-bold tracking-widest uppercase hover:underline hidden md:block"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/shop"
              className="inline-block border border-black px-8 py-4 text-sm font-bold uppercase tracking-widest"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Lookbook Teaser */}
      <section className="w-full py-24 md:py-0 md:h-[80vh] flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden">
          <img
            src="/images/lookbook-1.png"
            alt="Editorial"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-black text-white h-full">
          <h2 className="text-5xl md:text-7xl font-display uppercase mb-6">
            Concrete
            <br />
            Canvas
          </h2>
          <p className="text-gray-400 mb-10 max-w-md text-lg">
            Our latest editorial explores the tension between structured
            garments and raw urban environments.
          </p>
          <div>
            <Link
              href="/lookbook"
              className="inline-flex items-center gap-3 border border-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              View Lookbook
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
