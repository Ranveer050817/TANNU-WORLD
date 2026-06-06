import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = `Hello Tannu World,\n\nI want to order:\n\nProduct Name: ${product.name}\nPrice: ${product.price}\n\nPlease provide availability.`;
  const whatsappUrl = `https://wa.me/918252402339?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="group relative bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-gold-500/10 overflow-hidden transition-all hover:border-gold-500/30 flex flex-col p-4">
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden relative bg-white/5 mb-3">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80'} 
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80';
          }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        </div>
        {/* Status Badge */}
        {product.status && product.status.toLowerCase() !== 'in stock' && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
            {product.status === 'undefined' ? '' : product.status}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col">
        <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1">{product.category}</span>
        <h4 className="text-white text-xs font-semibold mb-1 truncate">{product.name}</h4>
        <p className="text-gold-500 text-xs font-bold mt-1">{product.price}</p>
        
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors text-center text-[9px] py-1.5 rounded-sm uppercase font-bold tracking-wider w-full block"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}
