import {AxiosError} from 'axios';
import {create} from 'zustand';

import {api} from '@/lib/api';
import type {Product as ProductType} from '@/types/product';


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

export const useProductStore = create<ProductState>((set) => ({
    ...initialState,

    fetchProduct: async (id) => {
        try {
            set({isLoading: true, error: null});

            const response = await api.get(`/products/${id}`);

            set({
                product: response.data.data,
                isLoading: false,
                error: null,
            });
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                set({
                    error: error.response?.data?.message || 'Failed to fetch product',
                    isLoading: false,
                });
            } else {
                set({
                    error: 'An error occurred while fetching product',
                    isLoading: false,
                });
            }
        }
    },

    clearError: () => set({error: null}),
}));
