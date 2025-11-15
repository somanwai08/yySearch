'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, CartItem } from '../../dexie/db';

interface CartContextType {
  items: CartItem[];
  addToCart: (teaId: number, name: string, price?: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from Dexie on mount
  const loadCart = async () => {
    const cartItems = await db.cart.toArray();
    setItems(cartItems);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (teaId: number, name: string, price?: number) => {
    const existing = await db.cart.where('teaId').equals(teaId).first();
    if (existing && existing.id) {
      // Update quantity if already in cart
      const newQty = existing.quantity + 1;
      await db.cart.update(existing.id, { quantity: newQty });
      setItems((prev) =>
        prev.map((it) => (it.id === existing.id ? { ...it, quantity: newQty } : it))
      );
    } else {
      // Add new item
      const newItem: CartItem = { teaId, name, quantity: 1, price };
      const id = await db.cart.add(newItem);
      setItems((prev) => [...prev, { ...newItem, id }]);
    }
  };

  const removeFromCart = async (id: number) => {
    await db.cart.delete(id);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
    } else {
      await db.cart.update(id, { quantity });
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, quantity } : it))
      );
    }
  };

  const clearCart = async () => {
    await db.cart.clear();
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
