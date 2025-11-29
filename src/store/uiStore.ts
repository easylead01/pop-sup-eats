import { create } from 'zustand';
import { Product } from '@/data/products';

interface UIStore {
  isMenuOpen: boolean;
  isAuthOpen: boolean;
  selectedProduct: Product | null;
  authStep: 'phone' | 'code';
  isLoggedIn: boolean;
  phoneNumber: string;
  
  setMenuOpen: (isOpen: boolean) => void;
  setAuthOpen: (isOpen: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  setAuthStep: (step: 'phone' | 'code') => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setPhoneNumber: (phone: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  isAuthOpen: false,
  selectedProduct: null,
  authStep: 'phone',
  isLoggedIn: false,
  phoneNumber: '',
  
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  setAuthOpen: (isOpen) => set({ isAuthOpen: isOpen, authStep: 'phone' }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setAuthStep: (step) => set({ authStep: step }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
}));
