import { api } from '@/lib/api';
import { create } from 'zustand';
import { AxiosError } from 'axios';
import type { Category } from '@/types/category';

interface CategoryState {
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

export const useCategoryStore = create<CategoryState>((set) => ({
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
            if (error instanceof AxiosError) {
                set({
                    error: error.response?.data?.message || 'Failed to fetch categories',
                    isLoading: false,
                });
            } else {
                set({
                    error: 'An error occurred while fetching categories',
                    isLoading: false,
                });
            }
        }
    },

    clearError: () => set({ error: null }),
}));
