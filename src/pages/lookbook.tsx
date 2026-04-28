import { motion } from "framer-motion";

export default function Lookbook() {
  const images = [
    "/images/lookbook-1.png",
    "/images/lookbook-2.png",
    "/images/hero.png",
    "/images/product-5.png",
    "/images/product-6.png"
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        
        <header className="mb-24 md:mb-40 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display uppercase tracking-tight leading-none mb-8"
          >
            Vol. 1<br/>Concrete
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed"
          >
            An exploration of harsh shadows, brutalist architecture, and the stark contrast of pure monochrome garments.
          </motion.p>
        </header>

        {/* Editorial Layout */}
        <div className="space-y-32 md:space-y-64">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="col-span-1 md:col-span-8"
            >
              <img src={images[0]} alt="Editorial Shot 1" className="w-full h-auto object-cover" />
            </motion.div>
            <div className="col-span-1 md:col-span-4 md:pl-8">
              <h2 className="text-3xl font-display uppercase mb-4">Structure & Void</h2>
              <p className="text-gray-400">The intersection of heavy cotton fabrics and hard urban geometry. Creating silhouettes that stand apart from their environment.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mt-0 md:mt-32"
            >
              <img src={images[3]} alt="Editorial Shot 2" className="w-full h-[70vh] object-cover" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={images[4]} alt="Editorial Shot 3" className="w-full h-[80vh] object-cover" />
            </motion.div>
          </div>

          <div className="relative h-screen w-full">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img src={images[1]} alt="Editorial Shot 4" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-5xl md:text-8xl font-display uppercase text-center max-w-4xl leading-tight">
                No Distractions.<br/>Only Impact.
              </h2>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
