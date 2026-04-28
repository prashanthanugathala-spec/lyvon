import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center mb-32">
          <div className="w-full md:w-1/2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-display uppercase tracking-tight leading-none mb-8"
            >
              The<br/>Atelier
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-lg text-muted-foreground"
            >
              <p>
                LYVON was founded on a singular premise: the rejection of excess. In a landscape saturated with noise, color, and fleeting trends, we chose the absolute contrast.
              </p>
              <p>
                Black and white. Nothing else.
              </p>
              <p>
                When you strip away color, you are forced to confront the fundamentals of design: silhouette, texture, typography, and tension. Our garments are not just t-shirts; they are canvases for brutalist graphics and architectural forms.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/2 aspect-[4/5] bg-muted relative overflow-hidden"
          >
            <img src="/images/about.png" alt="LYVON Atelier Portrait" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-24 border-y border-border">
          <div className="space-y-4">
            <h3 className="text-2xl font-display uppercase">The Fabric</h3>
            <p className="text-muted-foreground">We source exclusively heavyweight, premium cottons ranging from 220gsm to 320gsm. The drape must be structural. The garment must hold its shape.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-display uppercase">The Print</h3>
            <p className="text-muted-foreground">High-density plastisol, subtle gloss on matte, and stark contrasting screens. Our prints are engineered to be tactile and enduring.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-display uppercase">The Ethos</h3>
            <p className="text-muted-foreground">Restricted runs. No restocks of seasonal graphics. When a design is gone, it becomes an archive piece. We build for permanence.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
