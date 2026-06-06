import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?auto=format&fit=crop&w=1920&q=80" 
          alt="Mens Fashion Collections, Watches and Accessories" 
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-gold-500 uppercase tracking-[0.3em] text-xs sm:text-sm mb-6 font-medium"
        >
          Discover True Elegance
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-display leading-none italic text-white mb-8 tracking-tight"
        >
          ELEVATE YOUR <br className="hidden sm:block" />
          <span className="not-italic font-bold text-gold-500 uppercase text-4xl md:text-6xl lg:text-7xl">
            LIFESTYLE
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a 
            href="#categories" 
            className="w-full sm:w-auto px-5 py-2.5 bg-gold-500 text-black hover:bg-white transition-colors font-semibold uppercase tracking-[0.05em] text-xs"
          >
            Explore Collection
          </a>
          <a 
            href="https://wa.me/918252402339"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 bg-white/10 text-white hover:bg-white border border-transparent hover:text-black transition-colors font-semibold uppercase tracking-[0.05em] text-xs backdrop-blur-md"
          >
            Order on WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
