import { AxiosError } from 'axios';
import { create, StoreApi } from 'zustand';

import { api } from '@/lib/api';
import type { Cart, CartItem } from '@/types/cart';
import { Product, ProductCard } from '@/types/product';

interface CartState extends Cart {
    isLoading: boolean;
    fetchCartError: string | null;
    addItemError: string | null;
    removeItemError: string | null;

    // Actions
    fetchCart: () => Promise<void>;
    addItem: (product: Product | ProductCard, quantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;

    // Error handling
    clearFetchCartError: () => void;
    clearAddItemError: () => void;
    clearRemoveItemError: () => void;

    reset: () => void;
}

const handleError = (
    error: unknown,
    set: StoreApi<CartState>['setState'],
    defaultMessage: string,
    errorField: keyof CartState,
) => {
    if (error instanceof AxiosError) {
        set({
            [errorField]: error.response?.data?.message || defaultMessage,
            isLoading: false,
        });
    } else {
        set({
            [errorField]: `An error occurred: ${defaultMessage}`,
            isLoading: false,
        });
    }
};

const initialState: Omit<
    CartState,
    | 'fetchCart'
    | 'addItem'
    | 'removeItem'
    | 'clearFetchCartError'
    | 'clearAddItemError'
    | 'clearRemoveItemError'
    | 'reset'
> = {
    items: [],
    totalPrice: 0,
    totalDiscount: 0,
    totalItems: 0,
    isLoading: false,
    fetchCartError: null,
    addItemError: null,
    removeItemError: null,
};

const calculateCartTotals = (items: CartItem[]) => {
    const totalItems = items.length;
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * (item.discountedPrice || item.price), 0);
    const totalDiscount = items.reduce(
        (sum, item) => sum + item.quantity * (item.price - (item.discountedPrice || item.price)),
        0,
    );
    return { totalItems, totalPrice, totalDiscount };
};

export const useCartStore = create<CartState>((set, get) => ({
    ...initialState,

    fetchCart: async () => {
        try {
            set({ isLoading: true, fetchCartError: null });
            const response = await api.get('/cart');
            set({
                ...response.data.data,
                isLoading: false,
                fetchCartError: null,
                isInitialized: true,
            });
        } catch (error) {
            handleError(error, set, 'Failed to fetch cart', 'fetchCartError');
        }
    },

    addItem: async (product: Product | ProductCard, quantity: number) => {
        if (typeof product === 'object' && 'imageUrls' in product) {
            const { imageUrls, ...rest } = product;
            product = { ...rest, imageUrl: imageUrls[0] };
        }

        const currentItems = [...get().items];

        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
            const updatedItems = currentItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
            );

            const totals = calculateCartTotals(updatedItems);

            set({ items: updatedItems, ...totals, addItemError: null });
        } else {
            const newItem: CartItem = {
                id: product.id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                discountedPrice: product.discountedPrice || 0,
                quantity,
            };

            const updatedItems = [...currentItems, newItem];

            const totals = calculateCartTotals(updatedItems);

            set({ items: updatedItems, ...totals, addItemError: null });
        }

        try {
            await api.post('/cart/items', { id: product.id, quantity });
        } catch (error) {
            // Revert optimistic update
            if (existingItem) {
                const revertedTotals = calculateCartTotals(currentItems);
                set({ items: currentItems, ...revertedTotals });
            }

            handleError(error, set, 'Failed to add item to cart', 'addItemError');
        }
    },

    removeItem: async (productId: string) => {
        // Store current state for potential rollback
        const currentItems = [...get().items];
        const removedItem = currentItems.find((item) => item.id === productId);

        console.log('removedItem', removedItem);

        // Apply optimistic update
        const updatedItems = currentItems.filter((item) => item.id !== productId);
        const totals = calculateCartTotals(updatedItems);
        set({ items: updatedItems, ...totals, removeItemError: null });

        try {
            await api.delete(`/cart/items/${productId}`);
        } catch (error) {
            // Revert optimistic update
            if (removedItem) {
                const revertedTotals = calculateCartTotals(currentItems);
                set({ items: currentItems, ...revertedTotals });
            }
            handleError(error, set, 'Failed to remove item from cart', 'removeItemError');
        }
    },

    clearCart: async () => {
        try {
            await api.delete('/cart');
            set({ ...initialState });
        } catch (error) {
            handleError(error, set, 'Failed to clear cart', 'fetchCartError');
        }
    },

    clearFetchCartError: () => set({ fetchCartError: null }),
    clearAddItemError: () => set({ addItemError: null }),
    clearRemoveItemError: () => set({ removeItemError: null }),

    reset: async () => {
        try {
            await api.delete('/cart');
            set({ ...initialState });
        } catch (error) {
            handleError(error, set, 'Failed to reset cart', 'fetchCartError');
        }
    },
}));
