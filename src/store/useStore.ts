import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '../types';

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      isCartOpen: false,
      isMobileMenuOpen: false,
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isCartOpen: true,
            };
          }
          return { cart: [...state.cart, { ...product, quantity }], isCartOpen: true };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        }),
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    }),
    {
      name: 'pearl-haven-storage',
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
);
