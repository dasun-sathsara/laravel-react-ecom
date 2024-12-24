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

interface AddProductInput {
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    categoryId: number;
    stock: number;
    featured: boolean;
    imageUrls: string[];
}

interface ProductsState {
    featuredProducts: ProductCard[];
    products: ProductCard[];
    selectedProduct: Product | null;
    isLoading: boolean;
    fetchFeaturedProductsError: string | null;
    fetchProductsError: string | null;
    addProductError: string | null;
    updateProductError: string | null;
    deleteProductError: string | null;
    categoryName: string | null;
    pagination: PaginationState;
    fetchProductError: string | null;

    fetchFeaturedProducts: () => Promise<void>;
    fetchProducts: (page: number, categoryId?: number) => Promise<void>;
    addProduct: (product: AddProductInput) => Promise<void>;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    fetchProduct: (id: string) => Promise<void>;

    clearFetchFeaturedProductsError: () => void;
    clearFetchProductsError: () => void;
    clearAddProductError: () => void;
    clearUpdateProductError: () => void;
    clearDeleteProductError: () => void;
    clearFetchProductError: () => void;

    reset: () => void;
}

const initialPaginationState: PaginationState = {
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    totalProducts: 0,
};

const handleError = (
    error: unknown,
    set: StoreApi<ProductsState>['setState'],
    defaultMessage: string,
    errorField: keyof ProductsState,
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

export const useProductsStore = create<ProductsState>((set) => ({
    // Initial state
    featuredProducts: [],
    products: [],
    selectedProduct: null,
    isLoading: false,
    fetchFeaturedProductsError: null,
    fetchProductsError: null,
    addProductError: null,
    updateProductError: null,
    deleteProductError: null,
    categoryName: null,
    pagination: initialPaginationState,
    fetchProductError: null,

    // Actions
    fetchFeaturedProducts: async () => {
        try {
            set({ isLoading: true, fetchFeaturedProductsError: null });
            const response = await api.get('/featured-products');
            set({
                featuredProducts: response.data.data,
                isLoading: false,
                fetchFeaturedProductsError: null,
            });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to fetch featured products', 'fetchFeaturedProductsError');
        }
    },

    fetchProducts: async (page, categoryId) => {
        try {
            set({ isLoading: true, fetchProductsError: null });
            const params = new URLSearchParams({
                ...(categoryId !== undefined && { categoryId: categoryId.toString() }),
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
                fetchProductsError: null,
                categoryName: categoryId ? data[0].categoryName : null,
            });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to fetch products', 'fetchProductsError');
        }
    },

    addProduct: async (product) => {
        const isAdmin = useAuthStore.getState().isAdmin();

        if (!isAdmin) {
            set({ addProductError: 'Unauthorized: Admin access required' });
            return;
        }

        try {
            set({ isLoading: true, addProductError: null });
            const response = await api.post('/products', product);
            set((state) => ({
                products: [...state.products, response.data],
                isLoading: false,
                addProductError: null,
            }));
        } catch (error: unknown) {
            handleError(error, set, 'Failed to add product', 'addProductError');
        }
    },

    updateProduct: async (id, updatedProduct) => {
        const isAdmin = useAuthStore.getState().isAdmin();

        if (!isAdmin) {
            set({ updateProductError: 'Unauthorized: Admin access required' });
            return;
        }

        try {
            set({ isLoading: true, updateProductError: null });
            const response = await api.put(`/products/${id}`, updatedProduct);
            set((state) => ({
                products: state.products.map((prod) => (prod.id === id ? response.data : prod)),
                isLoading: false,
                updateProductError: null,
            }));
        } catch (error: unknown) {
            handleError(error, set, 'Failed to update product', 'updateProductError');
        }
    },

    deleteProduct: async (id) => {
        const isAdmin = useAuthStore.getState().isAdmin();

        if (!isAdmin) {
            set({ deleteProductError: 'Unauthorized: Admin access required' });
            return;
        }

        try {
            set({ isLoading: true, deleteProductError: null });
            await api.delete(`/products/${id}`);
            set((state) => ({
                products: state.products.filter((prod) => prod.id !== id),
                isLoading: false,
                deleteProductError: null,
            }));
        } catch (error: unknown) {
            handleError(error, set, 'Failed to delete product', 'deleteProductError');
        }
    },

    fetchProduct: async (id) => {
        try {
            set({ isLoading: true, fetchProductError: null });
            const response = await api.get(`/products/${id}`);
            set({
                selectedProduct: response.data.data,
                isLoading: false,
                fetchProductError: null,
            });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to fetch product', 'fetchProductError');
        }
    },

    // Clear functions for each error state
    clearFetchFeaturedProductsError: () => set({ fetchFeaturedProductsError: null }),
    clearFetchProductsError: () => set({ fetchProductsError: null }),
    clearAddProductError: () => set({ addProductError: null }),
    clearUpdateProductError: () => set({ updateProductError: null }),
    clearDeleteProductError: () => set({ deleteProductError: null }),
    clearFetchProductError: () => set({ fetchProductError: null }),

    // Reset function to clear all states
    reset: () =>
        set({
            featuredProducts: [],
            products: [],
            selectedProduct: null,
            isLoading: false,
            fetchFeaturedProductsError: null,
            fetchProductsError: null,
            addProductError: null,
            updateProductError: null,
            deleteProductError: null,
            pagination: initialPaginationState,
            categoryName: null,
            fetchProductError: null,
        }),
}));
