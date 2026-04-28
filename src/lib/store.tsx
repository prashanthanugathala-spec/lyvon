import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from './data';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface DirectOrder {
  product: Product;
  size: string;
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orderModalOpen: boolean;
  openOrderModal: (direct?: DirectOrder) => void;
  closeOrderModal: () => void;
  directOrder: DirectOrder | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [directOrder, setDirectOrder] = useState<DirectOrder | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('lyvon_cart');
    const savedWishlist = localStorage.getItem('lyvon_wishlist');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch { /* ignore */ }
    }
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lyvon_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lyvon_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          (item.product.id === product.id && item.size === size)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) => prev.map(item =>
      (item.product.id === productId && item.size === size)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const openOrderModal = (direct?: DirectOrder) => {
    setDirectOrder(direct ?? null);
    setOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setDirectOrder(null);
  };

  return (
    <StoreContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWishlist,
      orderModalOpen,
      openOrderModal,
      closeOrderModal,
      directOrder,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
