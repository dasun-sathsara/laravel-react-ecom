import { api } from '@/lib/api';
import { create } from 'zustand';
import type { Category } from '@/types/category';

interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    clearError: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get('/categories');

            set({
                categories: response.data.data,
                isLoading: false,
            });
        } catch {
            set({
                error: 'Failed to fetch categories',
                isLoading: true,
            });
        }
    },

    clearError: () => set({ error: null }),
}));
