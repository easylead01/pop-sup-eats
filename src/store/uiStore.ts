import { create } from 'zustand';
import { Product } from '@/data/products';

interface UIStore {
  isMenuOpen: boolean;
  isAuthOpen: boolean;
  isCheckoutOpen: boolean;
  selectedProduct: Product | null;
  isFiltersOpen: boolean;
  authStep: 'phone' | 'code';
  isLoggedIn: boolean;
  phoneNumber: string;
  filterTags: string[];
  sortOption: 'popular' | 'price-desc' | 'price-asc';
  
  setMenuOpen: (isOpen: boolean) => void;
  setAuthOpen: (isOpen: boolean) => void;
  setCheckoutOpen: (isOpen: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  setAuthStep: (step: 'phone' | 'code') => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setPhoneNumber: (phone: string) => void;
  setFiltersOpen: (isOpen: boolean) => void;
  setFilterTags: (tags: string[]) => void;
  setSortOption: (option: 'popular' | 'price-desc' | 'price-asc') => void;
  resetFilters: () => void;
  openCheckoutWithAuthCheck: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  isMenuOpen: false,
  isAuthOpen: false,
  isCheckoutOpen: false,
  selectedProduct: null,
  isFiltersOpen: false,
  authStep: 'phone',
  isLoggedIn: false,
  phoneNumber: '',
  filterTags: [],
  sortOption: 'popular',
  
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  setAuthOpen: (isOpen) => set({ isAuthOpen: isOpen, authStep: 'phone' }),
  setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setAuthStep: (step) => set({ authStep: step }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  setFiltersOpen: (isOpen) => set({ isFiltersOpen: isOpen }),
  setFilterTags: (tags) => set({ filterTags: tags }),
  setSortOption: (sortOption) => set({ sortOption }),
  resetFilters: () => set({ filterTags: [], sortOption: 'popular' }),
  
  openCheckoutWithAuthCheck: () => {
    const { isLoggedIn } = get();
    if (isLoggedIn) {
      set({ isCheckoutOpen: true });
    } else {
      set({ isAuthOpen: true });
    }
  },
}));
