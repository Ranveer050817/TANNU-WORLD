import { MapPin, Phone, Instagram, Clock, ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-gold-600" />
              <span className="font-display text-xl font-bold tracking-wider text-black">
                TANNU <span className="text-gold-600">WORLD</span>
              </span>
            </div>
            <p className="text-black/70 text-[10px] leading-relaxed max-w-sm uppercase">
              Your premier destination for luxury men's fashion and accessories. 
              Elevate your style with our curated collection of premium quality products.
            </p>
          </div>

          {/* Contact */}
          <div className="md:border-l border-black/10 md:pl-12">
            <h3 className="font-bold text-xs uppercase mb-4 tracking-tighter text-black">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://www.google.com/maps/search/?api=1&query=Ho+No+8002,+Main+Road,+Khariodih,+Jharkhand+815314" target="_blank" rel="noreferrer" className="flex items-start space-x-3 text-black/80 hover:text-gold-600 transition-colors cursor-pointer group">
                  <MapPin className="w-4 h-4 text-gold-600 group-hover:text-gold-600 shrink-0 mt-0.5" />
                  <span className="text-[10px] uppercase font-bold">Ho No 8002, Main Road, Khariodih<br />Jharkhand 815314</span>
                </a>
              </li>
              <li className="flex items-center space-x-3 text-black/80">
                <Phone className="w-4 h-4 text-gold-600 shrink-0" />
                <span className="text-[10px] uppercase font-bold">+91 82524 02339</span>
              </li>
              <li className="flex items-center space-x-3 text-black/80">
                <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                <span className="text-[10px] uppercase font-bold">Opens 8:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="md:border-l border-black/10 md:pl-12">
            <h3 className="font-bold text-xs uppercase mb-4 tracking-tighter text-black">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:text-gold-600 hover:border-gold-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/918252402339" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:text-gold-600 hover:border-gold-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black/60 text-[9px] uppercase tracking-wider">
            &copy; {new Date().getFullYear()} TANNU WORLD LUXURY. ALL RIGHTS RESERVED. PRODUCTION READY BUILD.
          </p>
          <div className="mt-4 md:mt-0 space-x-6 text-[9px] uppercase tracking-widest text-black/60 font-bold">
            <a href="#" className="hover:text-gold-600">PRIVACY POLICY</a>
            <a href="#" className="hover:text-gold-600">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
