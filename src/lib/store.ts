import { Product } from '../types';
import { db, storage } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { handleFirestoreError, OperationType } from './firebaseErrors';
import { MOCK_PRODUCTS } from './mockData';

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(new Error(`Failed to convert image to base64: ${error}`));
    };
    // Note: Firestore has a 1 MiB document size limit.
    if (file.size > 800000) {
      reject(new Error("Image size too large. Please select an image under 800KB."));
      return;
    }
    reader.readAsDataURL(file);
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

