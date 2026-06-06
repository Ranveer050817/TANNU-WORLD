import React, { useState, useEffect } from 'react';
import { getSheetUrl, setSheetUrl } from '../lib/googleSheets';
import { Database, Link as LinkIcon, CheckCircle2, Info } from 'lucide-react';

export default function AdminSection() {
  const [url, setUrl] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setUrl(getSheetUrl());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSheetUrl(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section id="admin" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-4xl italic text-white mb-4">Store <span className="font-bold text-gold-500 uppercase not-italic">Management</span></h2>
          <p className="text-white/40 uppercase tracking-widest text-[10px]">Configure your data source and inventory</p>
        </div>

        {/* Configuration Card */}
        <div className="bg-[#1a1a1a] border border-white/5 p-10 font-sans">
          <div className="flex items-center space-x-3 mb-6 border-b border-white/5 pb-4">
            <Database className="w-5 h-5 text-gold-500" />
            <h3 className="text-xl font-bold uppercase tracking-widest text-white italic font-display">Database <span className="text-gold-500 not-italic">Connection</span></h3>
          </div>
          
          <p className="text-gray-400 mb-6 leading-relaxed">
            Your website uses Google Sheets as a database. This allows you to manage products, categories, 
            and pricing without any coding. Just paste your published CSV link below.
          </p>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-500 mb-2">
                Google Sheets CSV URL
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                    className="block w-full pl-10 bg-black border border-white/20 text-white rounded-none py-3 focus:ring-gold-500 focus:border-gold-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gold-500 text-black font-medium uppercase tracking-widest text-sm hover:bg-white transition-colors whitespace-nowrap"
                >
                  Save Sync
                </button>
              </div>
            </div>
            
            {saved && (
              <div className="flex items-center space-x-2 text-green-500 mt-4 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Connection saved successfully. Your website will now load data from this sheet.</span>
              </div>
            )}
          </form>
        </div>

        {/* Instructions */}
        <div className="bg-[#1a1a1a] border border-white/5 p-10 font-sans">
          <div className="flex items-center space-x-3 mb-6 border-b border-white/5 pb-4">
            <Info className="w-5 h-5 text-gold-500" />
            <h3 className="text-xl font-bold uppercase tracking-widest text-white italic font-display">How to Manage <span className="text-gold-500 not-italic">Products</span></h3>
          </div>

          <div className="space-y-8 text-gray-300">
            
            <section className="space-y-3">
              <h4 className="text-white text-lg font-medium">1. Create Your Sheet</h4>
              <p>Create a new Google Sheet with the exact following column headers in the first row:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400 font-mono text-sm bg-black p-4 border border-white/5">
                <li>Category</li>
                <li>Product Name</li>
                <li>Price</li>
                <li>Image URL</li>
                <li>Description</li>
                <li>Status</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h4 className="text-white text-lg font-medium">2. Add Your Products</h4>
              <p>Add your products row by row. Everything is automatic:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                <li><strong>Categories:</strong> The website will automatically group products into sections based on your Category column.</li>
                <li><strong>Pricing:</strong> Update the price in the spreadsheet, and it will update on the website immediately.</li>
                <li><strong>Images:</strong> Upload your images to an image hosting service (like Imgur) and paste the direct link in the Image URL column.</li>
                <li><strong>Availability:</strong> Set the Status column to 'In Stock' or 'Out of Stock'.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h4 className="text-white text-lg font-medium">3. Publish to Web</h4>
              <p>To connect the sheet to this website:</p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-400 text-sm">
                <li>In Google Sheets, go to <strong className="text-white">File &gt; Share &gt; Publish to web</strong>.</li>
                <li>Change the setting from "Web page" to <strong className="text-white">"Comma-separated values (.csv)"</strong>.</li>
                <li>Click Publish and copy the generated link.</li>
                <li>Paste the link into the Database Connection form above.</li>
              </ol>
            </section>

          </div>
        </div>

      </div>
    </section>
  );
}
