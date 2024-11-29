import { AxiosError } from 'axios';
import { create } from 'zustand';

import { api } from '@/lib/api';
import type { ProductCard as ProductCardType } from '@/types/product';

interface PaginationState {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalProducts: number;
}

interface ProductState {
    featuredProducts: ProductCardType[];
    products: ProductCardType[];
    isLoading: boolean;
    error: string | null;
    pagination: PaginationState;
    categoryName: string | null;
    fetchFeaturedProducts: () => Promise<void>;
    fetchProducts: (page: number, categoryId?: number) => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialPaginationState: PaginationState = {
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    totalProducts: 0,
};

export const useProductStore = create<ProductState>((set) => ({
    featuredProducts: [],
    products: [],
    isLoading: false,
    error: null,
    categoryName: null,
    pagination: initialPaginationState,

    fetchFeaturedProducts: async () => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get('/featured-products');

            set({
                featuredProducts: response.data.data,
                isLoading: false,
                error: null,
            });
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                set({
                    error: error.response?.data?.message || 'Failed to fetch featured products',
                    isLoading: false,
                });
            } else {
                set({
                    error: 'An error occurred while fetching featured products',
                    isLoading: false,
                });
            }
        }
    },

    fetchProducts: async (page, categoryId) => {
        try {
            set({ isLoading: true, error: null });

            const params = new URLSearchParams({
                ...(categoryId != undefined && { categoryId: categoryId.toString() }),
                page: page.toString(),
            });

            const response = await api.get(`/products?${params}`);
            const { data, meta } = response.data;

            set({
                products: data,
                pagination: {
                    currentPage: meta.current_page,
                    hasNextPage: meta.current_page < meta.last_page,
                    hasPreviousPage: meta.current_page > 1,
                    totalProducts: meta.total,
                },
                isLoading: false,
                error: null,
                categoryName: categoryId ? data[0].categoryName : null,
            });
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                set({
                    error: error.response?.data?.message || 'Failed to fetch products',
                    isLoading: false,
                });
            } else {
                set({
                    error: 'An error occurred while fetching products',
                    isLoading: false,
                });
            }
        }
    },

    clearError: () => set({ error: null }),

    reset: () =>
        set({
            featuredProducts: [],
            products: [],
            isLoading: false,
            error: null,
            pagination: initialPaginationState,
        }),
}));
