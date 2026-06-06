import { useEffect, useState, useMemo } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import AdminSection from '../components/AdminSection';
import { Product } from '../types';
import { fetchProducts } from '../lib/googleSheets';
import { Instagram, MapPin, Star, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  const filteredCategories = activeCategory === 'All' 
    ? categories 
    : [activeCategory];

  return (
    <div className="bg-black min-h-screen">
      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 bg-[#1a1a1a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center text-center border-l-2 border-gold-500 p-8">
            <h2 className="font-display text-4xl italic text-white mb-6">About Tannu World</h2>
            <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-light">
              Men's Fashion Destination at Khariodih, Jharkhand. We bridge the gap between luxury and lifestyle, 
              bringing you trendy and premium products including watches, sunglasses, and leather accessories.
              Curated for the modern gentleman who appreciates quality and sophistication.
            </p>
            <div className="text-[10px] uppercase text-white/40 mt-6 tracking-widest">Opens Daily at 8:00 AM</div>
          </div>
        </div>
      </section>

      {/* Products By Category */}
      <section id="categories" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl italic text-white mb-4">Our <span className="font-bold text-gold-500 uppercase not-italic">Collections</span></h2>
            <p className="text-white/40 uppercase tracking-widest text-[10px]">Discover Premium Selection</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 text-[10px] uppercase font-bold tracking-widest border transition-all ${
                activeCategory === 'All' 
                  ? 'border-gold-500 text-gold-500 bg-gold-500/10' 
                  : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-[10px] uppercase font-bold tracking-widest border transition-all ${
                  activeCategory === cat 
                    ? 'border-gold-500 text-gold-500 bg-gold-500/10' 
                    : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border border-white/5 bg-[#1a1a1a] p-8 text-center">
              <h3 className="font-display text-2xl italic text-white mb-2">No Products Available</h3>
              <p className="text-white/60 text-sm">Please check back later or update the Google Sheets database.</p>
            </div>
          ) : (
            <div className="space-y-24">
              <AnimatePresence mode="popLayout">
              {filteredCategories.map(category => {
                const categoryProducts = products.filter(
                  p => p.category.toLowerCase() === category.toLowerCase()
                );

                if (categoryProducts.length === 0) return null;

                const featured = activeCategory === 'All' ? categoryProducts.slice(0, 6) : categoryProducts;

                return (
                  <motion.div 
                    key={category} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h3 className="font-display text-2xl italic text-white">Featured <span className="text-gold-500 font-bold uppercase not-italic text-lg ml-1">{category}</span></h3>
                      <span className="text-white/40 text-[10px] uppercase tracking-widest">{categoryProducts.length} Items</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {featured.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-[#1a1a1a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl italic text-white mb-16">Client <span className="font-bold text-gold-500 uppercase not-italic">Testimonials</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
               <div key={i} className="bg-black/50 p-8 border border-white/5 border-t-2 border-t-gold-500 hover:bg-black transition-colors">
                 <div className="flex justify-center space-x-1 mb-6 text-gold-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                 </div>
                 <p className="text-white/70 italic mb-6 leading-relaxed text-sm">
                   "The quality of the products I received from Tannu World was exceptional. 
                   Truly a premium experience from start to finish."
                 </p>
                 <p className="text-white font-bold tracking-widest text-[9px] uppercase">
                   Verified Customer
                 </p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Instagram */}
      <section id="contact" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Instagram */}
            <div className="flex flex-col justify-center text-center lg:text-left bg-[#151515] p-12 border border-white/5">
              <Instagram className="w-10 h-10 text-gold-500 mb-6 mx-auto lg:mx-0" />
              <h2 className="font-display text-4xl italic text-white mb-4">Follow Our <span className="font-bold text-gold-500 uppercase not-italic">Journey</span></h2>
              <p className="text-white/60 text-sm mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Join our community on Instagram for the latest updates, style inspiration, and exclusive offers.
              </p>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block px-10 py-3 bg-white/5 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-colors uppercase tracking-[0.1em] text-[10px] font-bold self-center lg:self-start"
              >
                @TannuWorld
              </a>
            </div>

            {/* Location & Contact */}
            <div className="bg-[#1a1a1a] p-10 flex flex-col border border-white/5">
              <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
                {/* Location */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Ho+No+8002,+Main+Road,+Khariodih,+Jharkhand+815314" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border border-gold-500 group-hover:bg-gold-500 transition-colors flex items-center justify-center shrink-0">
                    <MapPin className="text-gold-500 group-hover:text-black transition-colors w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] text-white/40 uppercase mb-1 tracking-widest group-hover:text-gold-500 transition-colors">Location</h3>
                    <address className="text-[12px] text-white not-italic opacity-90 uppercase leading-normal group-hover:text-gold-500 transition-colors">
                      Ho No 8002, Main Rd,<br/>
                      Khariodih, Jharkhand
                    </address>
                  </div>
                </a>

                {/* Direct Contact */}
                <div className="flex flex-col gap-4">
                  <a href="tel:+918252402339" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-gold-500 bg-white/5 group-hover:bg-gold-500 transition-colors flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-[9px] text-white/40 uppercase tracking-widest">Phone</h3>
                      <span className="text-xs font-bold text-white uppercase">+91 82524 02339</span>
                    </div>
                  </a>
                  <a href="https://wa.me/918252402339" target="_blank" rel="noreferrer" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#25D366] bg-white/5 group-hover:bg-[#25D366] transition-colors flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-[9px] text-white/40 uppercase tracking-widest">WhatsApp</h3>
                      <span className="text-xs font-bold text-white uppercase">Message Us</span>
                    </div>
                  </a>
                </div>
              </div>
              
              <div className="flex-1 w-full bg-[#111] overflow-hidden border border-white/5 min-h-[250px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116348.6738914842!2d86.19692461019623!3d24.316886290886544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f136e4fba6e279%3A0x6d85eb5bd552e464!2sGiridih%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(100%) invert(90%) opacity(0.8)' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Admin Section */}
      <AdminSection />

    </div>
  );
}
