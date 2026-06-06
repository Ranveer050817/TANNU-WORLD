import Papa from 'papaparse';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  // Shoes
  { id: 's1', category: 'Shoes', name: 'Classic Leather Oxfords', price: '₹4,999', image: 'https://images.unsplash.com/photo-1614252339460-e1c15560965e?auto=format&fit=crop&q=80', description: 'Genuine leather oxford shoes.', status: 'In Stock' },
  { id: 's2', category: 'Shoes', name: 'Suede Chelsea Boots', price: '₹5,499', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80', description: 'Premium suede chelsea boots.', status: 'In Stock' },
  { id: 's3', category: 'Shoes', name: 'Premium Monk Strap Shoes', price: '₹6,299', image: 'https://images.unsplash.com/photo-1620803565561-eb1be24e2c69?auto=format&fit=crop&q=80', description: 'Double monk strap dress shoes.', status: 'In Stock' },
  { id: 's4', category: 'Shoes', name: 'Minimalist White Sneakers', price: '₹3,499', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80', description: 'Clean minimalist white leather sneakers.', status: 'In Stock' },
  { id: 's5', category: 'Shoes', name: 'Leather Loafers Black', price: '₹4,299', image: 'https://images.unsplash.com/photo-1559897146-2c9381ce505b?auto=format&fit=crop&q=80', description: 'Slip-on black leather loafers.', status: 'In Stock' },

  // Watches
  { id: 'w1', category: 'Watches', name: 'Luxury Chronograph', price: '₹12,499', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80', description: 'Premium chronograph watch for men.', status: 'In Stock' },
  { id: 'w2', category: 'Watches', name: 'Minimalist Silver Dial', price: '₹8,999', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80', description: 'Sleek silver dial minimalist dress watch.', status: 'In Stock' },
  { id: 'w3', category: 'Watches', name: 'Automatic Gold Tone', price: '₹15,999', image: 'https://images.unsplash.com/photo-1587836142079-cddd94f8373b?auto=format&fit=crop&q=80', description: 'Gold tone automatic movement watch.', status: 'In Stock' },
  { id: 'w4', category: 'Watches', name: 'Premium Diver Watch', price: '₹14,499', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80', description: 'Water resistant premium diving watch.', status: 'In Stock' },
  { id: 'w5', category: 'Watches', name: 'Leather Strap Vintage', price: '₹7,499', image: 'https://images.unsplash.com/photo-1508656942461-9c173afb3294?auto=format&fit=crop&q=80', description: 'Vintage style dial with genuine leather strap.', status: 'In Stock' },

  // Sunglasses
  { id: 'sg1', category: 'Sunglasses', name: 'Aviator Gold Premium', price: '₹2,299', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80', description: 'Gold-rimmed aviator sunglasses.', status: 'In Stock' },
  { id: 'sg2', category: 'Sunglasses', name: 'Classic Wayfarer Black', price: '₹1,899', image: 'https://images.unsplash.com/photo-1572635196237-14b3f28150cb?auto=format&fit=crop&q=80', description: 'Timeless black wayfarer shades.', status: 'In Stock' },
  { id: 'sg3', category: 'Sunglasses', name: 'Round Vintage Shades', price: '₹2,499', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80', description: 'Retro round metal frame sunglasses.', status: 'In Stock' },
  { id: 'sg4', category: 'Sunglasses', name: 'Polarized Clubmaster', price: '₹3,199', image: 'https://images.unsplash.com/photo-1508296695146-257a814050b4?auto=format&fit=crop&q=80', description: 'Polarized lenses with classic browline frame.', status: 'In Stock' },
  { id: 'sg5', category: 'Sunglasses', name: 'Titanium Square Frames', price: '₹4,499', image: 'https://images.unsplash.com/photo-1589785890989-105273ba58cc?auto=format&fit=crop&q=80', description: 'Durable titanium square frame sunglasses.', status: 'In Stock' },

  // Clothing
  { id: 'c1', category: 'Clothing', name: 'Tailored Black Suit', price: '₹14,999', image: 'https://images.unsplash.com/photo-1594938298592-23c8df9e8756?auto=format&fit=crop&q=80', description: 'Premium tailored black two-piece suit.', status: 'In Stock' },
  { id: 'c2', category: 'Clothing', name: 'White Poplin Shirt', price: '₹2,499', image: 'https://images.unsplash.com/photo-1620012253295-c15bc3e6583d?auto=format&fit=crop&q=80', description: 'Crisp white cotton poplin dress shirt.', status: 'In Stock' },
  { id: 'c3', category: 'Clothing', name: 'Premium Cashmere Overcoat', price: '₹18,999', image: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80', description: 'Luxurious cashmere blend winter overcoat.', status: 'In Stock' },
  { id: 'c4', category: 'Clothing', name: 'Navy Blue Blazer', price: '₹8,999', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80', description: 'Classic navy blue single-breasted blazer.', status: 'In Stock' },
  { id: 'c5', category: 'Clothing', name: 'Textured Knit Polo', price: '₹1,999', image: 'https://images.unsplash.com/photo-1586363104862-3a5e222ee1ee?auto=format&fit=crop&q=80', description: 'Premium textured knit polo shirt.', status: 'In Stock' },

  // Wallets
  { id: 'wa1', category: 'Wallets', name: 'Minimalist Leather Wallet', price: '₹1,299', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80', description: 'Slim genuine leather cardholder wallet.', status: 'In Stock' },
  { id: 'wa2', category: 'Wallets', name: 'Bifold Brown Leather', price: '₹1,899', image: 'https://images.unsplash.com/photo-1606148386407-1b3293881023?auto=format&fit=crop&q=80', description: 'Classic brown leather bifold wallet.', status: 'In Stock' },
  { id: 'wa3', category: 'Wallets', name: 'Carbon Fiber Cardholder', price: '₹2,499', image: 'https://images.unsplash.com/photo-1621508654686-809f23efdabc?auto=format&fit=crop&q=80', description: 'Modern carbon fiber and metal cardholder.', status: 'In Stock' },
  { id: 'wa4', category: 'Wallets', name: 'Travel Passport Wallet', price: '₹2,899', image: 'https://images.unsplash.com/photo-1559825595-ec94723c4a22?auto=format&fit=crop&q=80', description: 'Large leather wallet for passport and travel documents.', status: 'In Stock' },
  { id: 'wa5', category: 'Wallets', name: 'Slim RFID Wallet', price: '₹1,599', image: 'https://images.unsplash.com/photo-1616851214068-072a42537c35?auto=format&fit=crop&q=80', description: 'RFID blocking slim pocket wallet.', status: 'In Stock' },

  // Belts
  { id: 'b1', category: 'Belts', name: 'Classic Leather Belt', price: '₹1,199', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80', description: 'Durable black leather belt with gold buckle.', status: 'In Stock' },
  { id: 'b2', category: 'Belts', name: 'Reversible Black/Brown', price: '₹1,699', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80', description: 'Versatile reversible leather belt.', status: 'In Stock' },
  { id: 'b3', category: 'Belts', name: 'Suede Dress Belt', price: '₹1,499', image: 'https://images.unsplash.com/photo-1606293922114-16a7dc5e1e19?auto=format&fit=crop&q=80', description: 'Elegant suede belt for dress trousers.', status: 'In Stock' },
  { id: 'b4', category: 'Belts', name: 'Woven Leather Belt', price: '₹1,899', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80', description: 'Braided woven leather casual belt.', status: 'In Stock' },
  { id: 'b5', category: 'Belts', name: 'Premium Gold Buckle Belt', price: '₹2,299', image: 'https://images.unsplash.com/photo-1602497880998-cb5cd5a09c2a?auto=format&fit=crop&q=80', description: 'Full grain leather with luxury gold buckle.', status: 'In Stock' },

  // Accessories
  { id: 'a1', category: 'Accessories', name: 'Silver Tie Clip', price: '₹899', image: 'https://images.unsplash.com/photo-1533033560667-fe7d9fe4dbdb?auto=format&fit=crop&q=80', description: 'Minimalist silver tone tie clip.', status: 'In Stock' },
  { id: 'a2', category: 'Accessories', name: 'Silk Patterned Tie', price: '₹1,499', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80', description: '100% silk woven patterned necktie.', status: 'In Stock' },
  { id: 'a3', category: 'Accessories', name: 'Enamel Cufflinks', price: '₹1,999', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80', description: 'Premium enamel and steel cufflinks set.', status: 'In Stock' },
  { id: 'a4', category: 'Accessories', name: 'Leather Bracelet', price: '₹699', image: 'https://images.unsplash.com/photo-1579977825588-467ce19eaacf?auto=format&fit=crop&q=80', description: 'Braided leather wrist bracelet with steel clasp.', status: 'In Stock' },
  { id: 'a5', category: 'Accessories', name: 'Pocket Square Set', price: '₹1,299', image: 'https://images.unsplash.com/photo-1605051939527-fac4cc0ef073?auto=format&fit=crop&q=80', description: 'Set of three silk blend pocket squares.', status: 'In Stock' },
];

export const getSheetUrl = () => {
  return localStorage.getItem('tannu_world_sheet_url') || '';
};

export const setSheetUrl = (url: string) => {
  localStorage.setItem('tannu_world_sheet_url', url);
};

export const fetchProducts = async (): Promise<Product[]> => {
  const url = getSheetUrl();
  if (!url) {
    return MOCK_PRODUCTS;
  }

  try {
    const response = await fetch(url);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const products: Product[] = results.data.map((row: any, index: number) => ({
            id: `sheet-item-${index}`,
            category: row['Category'] || 'Accessories',
            name: row['Product Name'] || 'Unknown Product',
            price: row['Price'] ? `₹${row['Price'].replace(/[^0-9.]/g, '')}` : '₹0',
            image: row['Image URL'] || 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80',
            description: row['Description'] || '',
            status: row['Status'] || 'In Stock',
          }));
          resolve(products.length > 0 ? products : MOCK_PRODUCTS);
        },
        error: (error: any) => {
          console.warn("Error parsing CSV:", error);
          resolve(MOCK_PRODUCTS); // Fallback on parsing error
        }
      });
    });
  } catch (error) {
    console.warn("Error fetching Google Sheet:", error);
    return MOCK_PRODUCTS; // Fallback on network error
  }
};
