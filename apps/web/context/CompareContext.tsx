'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Product = {
  id: string | number;
  name: string;
  image: string;
  price?: number | string;
  category?: string;
};

type CompareContextType = {
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string | number) => void;
  isInCompare: (productId: string | number) => boolean;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Sync with LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('khama_compare_list');
    if (saved) setCompareList(JSON.parse(saved));
  }, []);

  const addToCompare = (product: Product) => {
    if (compareList.length >= 4) {
      alert('يمكنك مقارنة 4 أقمشة كحد أقصى.');
      return;
    }
    if (compareList.find((p) => p.id === product.id)) return;
    
    const newList = [...compareList, product];
    setCompareList(newList);
    localStorage.setItem('khama_compare_list', JSON.stringify(newList));
  };

  const removeFromCompare = (productId: string | number) => {
    const newList = compareList.filter((p) => p.id !== productId);
    setCompareList(newList);
    localStorage.setItem('khama_compare_list', JSON.stringify(newList));
  };

  const isInCompare = (productId: string | number) => {
    return compareList.some((p) => p.id === productId);
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem('khama_compare_list');
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
