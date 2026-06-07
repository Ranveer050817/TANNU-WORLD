import { Product } from '../types';
import { db, storage } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { handleFirestoreError, OperationType } from './firebaseErrors';
import { MOCK_PRODUCTS } from './mockData';

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileExtension = file.name.split('.').pop();
      const fileName = `products/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
      const storageRef = ref(storage, fileName);
      
      // Firebase Storage SDK sometimes hangs indefinitely if the bucket isn't enabled in the console.
      // We set a 15 second timeout to provide a helpful error message instead of an infinite loading state.
      const timeout = setTimeout(() => {
        reject(new Error("Storage upload timed out. This usually means Firebase Storage is not initialized in your Firebase Console. Please go to console.firebase.google.com, select your project, click on 'Storage' and click 'Get Started'."));
      }, 15000);

      await uploadBytes(storageRef, file);
      clearTimeout(timeout);
      
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (error: any) {
      reject(new Error(`Upload failed: ${error.message}`));
    }
  });
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    if (querySnapshot.empty) {
      return MOCK_PRODUCTS;
    }
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    return products;
  } catch (error) {
    console.warn("Could not fetch products from Firestore, falling back to mock data", error);
    return MOCK_PRODUCTS;
  }
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const newDocRef = doc(collection(db, 'products'));
    const id = newDocRef.id;
    await setDoc(newDocRef, product);
    return { id, ...product } as Product;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'products');
    throw error;
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `products/${id}`);
    throw error;
  }
};

export const removeProduct = async (id: string) => {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    throw error;
  }
};

