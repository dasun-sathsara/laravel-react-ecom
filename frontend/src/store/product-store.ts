import { AxiosError } from 'axios';
import { create, StoreApi } from 'zustand';

import { api } from '@/lib/api';
import type { Product as ProductType } from '@/types/product';

interface ProductState {
    product: ProductType | null;
    isLoading: boolean;
    error: string | null;
    fetchProduct: (id: string) => Promise<void>;
    clearError: () => void;
}

const initialState = {
    product: null,
    isLoading: false,
    error: null,
};

const handleError = (error: unknown, set: StoreApi<ProductState>['setState'], defaultMessage: string) => {
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

export const useProductStore = create<ProductState>((set) => ({
    ...initialState,

    fetchProduct: async (id) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get(`/products/${id}`);

            set({
                product: response.data,
                isLoading: false,
                error: null,
            });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to fetch product');
        }
    },

    clearError: () => set({ error: null }),
}));
