import { api } from '@/lib/api';
import { create } from 'zustand';
import type { ProductCard as ProductCardType } from '@/types/product';

interface ProductState {
    featuredProducts: ProductCardType[];
    isLoading: boolean;
    error: string | null;
    fetchFeaturedProducts: () => Promise<void>;
    clearError: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
    featuredProducts: [],
    isLoading: false,
    error: null,

    fetchFeaturedProducts: async () => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get('/featured-products');

            console.log(response);

            set({
                featuredProducts: response.data.data,
                isLoading: false,
            });
        } catch {
            set({
                error: 'Failed to fetch featured products',
                isLoading: true,
            });
        }
    },

    clearError: () => set({ error: null }),
}));
