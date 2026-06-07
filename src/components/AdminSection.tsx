import React from 'react';
import { Settings, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminSection() {
  return (
    <section id="admin" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-4xl italic text-white mb-4">Store <span className="font-bold text-gold-500 uppercase not-italic">Management</span></h2>
          <p className="text-white/40 uppercase tracking-widest text-[10px]">Secure Admin Dashboard</p>
        </div>

        {/* Configuration Card */}
        <div className="bg-[#1a1a1a] border border-white/5 p-10 font-sans text-center flex flex-col items-center">
          <ShieldCheck className="w-16 h-16 text-gold-500 mb-6" />
          <h3 className="text-2xl font-bold uppercase tracking-widest text-white italic font-display mb-4">Admin <span className="text-gold-500 not-italic">Portal</span></h3>
          <p className="text-gray-400 mb-8 max-w-lg leading-relaxed text-sm">
            Access the secure administrative dashboard to manage products, update pricing, add categories, and edit product images completely independently.
          </p>
          <Link
            to="/admin"
            className="px-8 py-3 bg-gold-500 text-black font-medium uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center space-x-2"
          >
            <Settings size={18} />
            <span>Open Admin Panel</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
