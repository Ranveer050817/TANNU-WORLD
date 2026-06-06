import { Phone, MapPin, Instagram, Menu, X, Watch, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-gold-500" />
            <span className="font-display text-2xl font-bold tracking-wider text-white">
              TANNU <span className="text-gold-500">WORLD</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-[11px] uppercase tracking-[0.1em] text-white/60 hover:text-gold-500 transition-colors">About</a>
            <a href="#categories" className="text-[11px] uppercase tracking-[0.1em] text-white/60 hover:text-gold-500 transition-colors">Collections</a>
            <a href="#contact" className="text-[11px] uppercase tracking-[0.1em] text-white/60 hover:text-gold-500 transition-colors">Contact</a>
            <a href="#admin" className="text-[11px] uppercase tracking-[0.1em] text-white/40 hover:text-white transition-colors">Admin</a>
            
            <a 
              href="https://wa.me/918252402339" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center px-5 py-2.5 bg-gold-500 text-black hover:bg-white transition-all font-semibold uppercase tracking-[0.05em] text-xs"
            >
              Order Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-gold-500 py-2 uppercase tracking-[0.1em] text-[11px]">About</a>
            <a href="#categories" onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-gold-500 py-2 uppercase tracking-[0.1em] text-[11px]">Collections</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-gold-500 py-2 uppercase tracking-[0.1em] text-[11px]">Contact</a>
            <a href="#admin" onClick={() => setIsMenuOpen(false)} className="text-white/40 hover:text-white py-2 uppercase tracking-[0.1em] text-[11px]">Admin</a>
            
            <a 
              href="https://wa.me/918252402339" 
              target="_blank" 
              rel="noreferrer"
              className="mt-4 flex justify-center items-center px-5 py-2.5 bg-gold-500 text-black uppercase tracking-[0.05em] text-xs font-semibold"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
