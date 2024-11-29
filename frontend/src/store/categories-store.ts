import { AxiosError } from 'axios';
import { create, StoreApi } from 'zustand';

import { api } from '@/lib/api';
import type { Category } from '@/types/category';

interface CategoriesState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    clearError: () => void;
}

const initialState = {
    categories: [],
    isLoading: false,
    error: null,
};

const handleError = (error: unknown, set: StoreApi<CategoriesState>['setState'], defaultMessage: string) => {
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

export const useCategoriesStore = create<CategoriesState>((set) => ({
    ...initialState,

    fetchCategories: async () => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get('/categories');

            set({
                categories: response.data.data,
                isLoading: false,
                error: null,
            });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to fetch categories');
        }
    },

    clearError: () => set({ error: null }),
}));
