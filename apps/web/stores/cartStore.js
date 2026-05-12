import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existing = state.items.find(
          i => i.productId === item.productId && i.variantId === item.variantId
        );
        
        if (existing) {
          return {
            items: state.items.map(i =>
              i.productId === item.productId && i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          };
        }
        
        return { items: [...state.items, item] };
      }),
      
      removeItem: (productId, variantId) => set((state) => ({
        items: state.items.filter(
          i => !(i.productId === productId && i.variantId === variantId)
        )
      })),
      
      updateQuantity: (productId, quantity, variantId) => set((state) => ({
        items: state.items.map(i =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity }
            : i
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => get().items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      ),
      
      getCount: () => get().items.reduce(
        (sum, item) => sum + item.quantity, 0
      ),
    }),
    { name: 'khama-cart' }
  )
);
