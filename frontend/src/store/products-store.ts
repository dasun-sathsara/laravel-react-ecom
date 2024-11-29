import { AxiosError } from 'axios';
import { create, StoreApi } from 'zustand';

import { api } from '@/lib/api';
import type { Product, ProductCard } from '@/types/product';

import { useAuthStore } from './auth-store';

interface PaginationState {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalProducts: number;
}

interface ProductsState {
    featuredProducts: ProductCard[];
    products: ProductCard[];

    selectedProduct: Product | null;
    isLoading: boolean;
    error: string | null;
    pagination: PaginationState;
    categoryName: string | null;

    fetchFeaturedProducts: () => Promise<void>;
    fetchProducts: (page: number, categoryId?: number) => Promise<void>;
    addProduct: (product: Omit<ProductCard, 'id'>) => Promise<void>;
    updateProduct: (id: number, updatedProduct: Partial<ProductCard>) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;

    fetchProduct: (id: string) => Promise<void>;

    clearError: () => void;
    reset: () => void;
}

const initialPaginationState: PaginationState = {
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    totalProducts: 0,
};

const handleError = (error: unknown, set: StoreApi<ProductsState>['setState'], defaultMessage: string) => {
    if (error instanceof AxiosError) {
        set({
            error: error.response?.data?.message || defaultMessage,
            isLoading: false,
        });
    } else {
        set({
            error: `An error occurred: ${defaultMessage}`,
            isLoading: false,
        });
    }
};

export const useProductsStore = create<ProductsState>((set) => ({
    featuredProducts: [],
    products: [],
    selectedProduct: null,
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
            handleError(error, set, 'Failed to fetch featured products');
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
            handleError(error, set, 'Failed to fetch products');
        }
    },

    addProduct: async (product) => {
        const isAdmin = useAuthStore.getState().isAdmin();

        if (!isAdmin) {
            set({ error: 'Unauthorized: Admin access required' });
            return;
        }

        try {
            set({ isLoading: true, error: null });

            const response = await api.post('/api/products', product);

            set((state) => ({
                products: [...state.products, response.data],
                isLoading: false,
                error: null,
            }));
        } catch (error: unknown) {
            handleError(error, set, 'Failed to add product');
        }
    },

    updateProduct: async (id, updatedProduct) => {
        const isAdmin = useAuthStore.getState().isAdmin();

        if (!isAdmin) {
            set({ error: 'Unauthorized: Admin access required' });
            return;
        }

        try {
            set({ isLoading: true, error: null });
            const response = await api.put(`/api/products/${id}`, updatedProduct);
            set((state) => ({
                products: state.products.map((prod) => (Number(prod.id) === id ? response.data : prod)),
                isLoading: false,
                error: null,
            }));
        } catch (error: unknown) {
            handleError(error, set, 'Failed to update product');
        }
    },

    deleteProduct: async (id) => {
        const isAdmin = useAuthStore.getState().isAdmin();

        if (!isAdmin) {
            set({ error: 'Unauthorized: Admin access required' });
            return;
        }

        try {
            set({ isLoading: true, error: null });
            await api.delete(`/api/products/${id}`);
            set((state) => ({
                products: state.products.filter((prod) => Number(prod.id) !== id),
                isLoading: false,
                error: null,
            }));
        } catch (error: unknown) {
            handleError(error, set, 'Failed to delete product');
        }
    },

    fetchProduct: async (id) => {
        try {
            set({ isLoading: true, error: null });
            const response = await api.get(`/products/${id}`);
            set({
                selectedProduct: response.data.data,
                isLoading: false,
                error: null,
            });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to fetch product');
        }
    },

    clearError: () => set({ error: null }),

    reset: () =>
        set({
            featuredProducts: [],
            products: [],
            selectedProduct: null,
            isLoading: false,
            error: null,
            pagination: initialPaginationState,
            categoryName: null,
        }),
}));
