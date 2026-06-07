import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchAllProducts, addProduct as storeAddProduct, updateProduct as storeUpdateProduct, removeProduct as storeRemoveProduct, uploadImage } from '../lib/store';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, LogOut, Check, X, Image as ImageIcon, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const loadData = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
    const uniqueCats = Array.from(new Set(data.map(p => p.category)));
    setCategories(uniqueCats);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error(error);
      alert(`Authentication failed: ${error.message || 'Unknown error'}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill out Name, Price, and Category');
      return;
    }

    try {
      setIsSaving(true);
      if (isAdding) {
        await storeAddProduct(formData as Omit<Product, 'id'>);
      } else if (editingProduct) {
        await storeUpdateProduct(editingProduct.id, formData);
      }
      
      await loadData();
      setIsAdding(false);
      setEditingProduct(null);
      setFormData({});
    } catch (error: any) {
      alert('Failed to save product. Ensure you are an Admin. ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this product?')) {
      try {
        await storeRemoveProduct(id);
        await loadData();
      } catch (error: any) {
        alert('Failed to delete product. ' + error.message);
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsAdding(false);
  };

  const activeCategoriesCount = Array.from(new Set(products.map(p => p.category))).length;

  if (isLoadingAuth) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white">Loading...</p></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] p-8 border border-white/10 w-full max-w-sm text-center"
        >
          <h2 className="text-2xl font-display italic text-white mb-6">Admin <span className="text-gold-500 font-bold uppercase not-italic">Login</span></h2>
          <button 
            onClick={handleLogin}
            className="w-full bg-gold-500 text-black font-bold uppercase text-xs tracking-widest py-3 hover:bg-white transition-colors"
          >
            Sign in with Google
          </button>
          <p className="text-white/40 text-[10px] text-center mt-4 uppercase tracking-widest">Only authorized admins can make changes</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-display italic">Store <span className="text-gold-500 font-bold uppercase not-italic text-2xl">Manager</span></h1>
            <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">Live Firebase Database</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors border border-white/10 px-4 py-2 hover:border-white/30">
              View Website
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-xs uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors border border-red-900/30 px-4 py-2 hover:border-red-500/30"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1a1a1a] p-6 border border-white/5 border-l-2 border-l-gold-500">
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Total Products</p>
            <p className="text-3xl font-display italic">{products.length}</p>
          </div>
          <div className="bg-[#1a1a1a] p-6 border border-white/5 border-l-2 border-l-blue-500">
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Active Categories</p>
            <p className="text-3xl font-display italic">{activeCategoriesCount}</p>
          </div>
          <div className="bg-[#1a1a1a] p-6 border border-white/5 border-l-2 border-l-green-500">
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Recently Added</p>
            <p className="text-3xl font-display italic">{Math.min(products.length, 5)}</p>
          </div>
        </div>

        {/* Form Area */}
        {(isAdding || editingProduct) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-[#151515] p-6 border border-gold-500/30 mb-8 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <h3 className="text-lg font-display italic">{isAdding ? 'Add New' : 'Edit'} <span className="text-gold-500 font-bold uppercase not-italic text-sm">Product</span></h3>
              <button 
                onClick={() => { setIsAdding(false); setEditingProduct(null); setFormData({}); }}
                className="text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Product Name *</label>
                  <input required type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-white text-sm focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Price * (e.g. ₹1,499)</label>
                  <input required type="text" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-white text-sm focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Category *</label>
                  <input required type="text" value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-white text-sm focus:border-gold-500 outline-none" placeholder="e.g. Shoes or Wallets" />
                  <p className="text-[10px] text-white/30 mt-1">Existing: {categories.join(', ')}</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Status</label>
                  <select value={formData.status || 'In Stock'} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-white text-sm focus:border-gold-500 outline-none">
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Description</label>
                  <textarea rows={3} value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-white text-sm focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Image</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center justify-center space-x-2 bg-white/5 border border-white/20 p-4 cursor-pointer hover:bg-white/10 transition-colors">
                      <Upload size={16} className="text-gold-500" />
                      <span className="text-sm font-bold uppercase tracking-widest">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                    </label>
                    <div className="text-center text-[10px] text-white/40 uppercase tracking-widest my-1">- OR -</div>
                    <input type="text" value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} className="bg-black border border-white/20 p-2 text-white text-sm focus:border-gold-500 outline-none w-full" placeholder="Paste an image URL..." />
                  </div>
                  {formData.image && (
                    <div className="mt-4 h-32 w-32 border border-white/20 overflow-hidden mx-auto bg-black/50 flex items-center justify-center">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-4 text-right">
                  <button disabled={isSaving || isUploading} type="submit" className="bg-gold-500 text-black px-8 py-3 text-xs uppercase font-bold tracking-widest hover:bg-white transition-colors flex items-center justify-center space-x-2 w-full md:w-auto ml-auto disabled:opacity-50">
                    <Check size={14} />
                    <span>{isSaving ? 'Saving...' : 'Save Product'}</span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Product List */}
        <div className="bg-[#1a1a1a] border border-white/5">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/30">
            <h3 className="font-display italic text-xl">Product <span className="text-gold-500 font-bold uppercase not-italic text-xs tracking-widest ml-1">Database</span></h3>
            <button 
              onClick={() => { setIsAdding(true); setEditingProduct(null); setFormData({ status: 'In Stock' }); }}
              className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold bg-white/5 border border-white/10 px-4 py-2 hover:bg-white/10 transition-colors"
            >
              <Plus size={14} />
              <span>Add New</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                  <th className="p-4 font-normal">Image</th>
                  <th className="p-4 font-normal">Name</th>
                  <th className="p-4 font-normal">Category</th>
                  <th className="p-4 font-normal">Price</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {products.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="w-10 h-10 bg-black/50 overflow-hidden border border-white/10 flex items-center justify-center">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={14} className="text-white/20" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4 text-white/60">{p.category}</td>
                    <td className="p-4 text-gold-500">{p.price}</td>
                    <td className="p-4">
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${p.status === 'In Stock' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {p.status || 'In Stock'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button onClick={() => handleEdit(p)} className="text-white/40 hover:text-white transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="text-white/40 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
               <div className="p-8 text-center text-white/40 text-[10px] uppercase tracking-widest">
                 No products found.
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
