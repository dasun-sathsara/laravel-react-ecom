import { AxiosError } from 'axios';
import { create } from 'zustand';

import { api } from '@/lib/api';
import type { User } from '@/types/user';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signup: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<boolean>;
    signin: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
    clearError: () => void;
    isAdmin: () => boolean;
}

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

export const useAuthStore = create<AuthState>((set, get) => ({
    ...initialState,

    signup: async (name: string, email: string, password: string, passwordConfirmation: string): Promise<boolean> => {
        try {
            set({ isLoading: true, error: null });

            await api.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            set({
                isLoading: false,
                error: null,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.status === 422) {
                set({
                    error: error.response.data.message,
                    isLoading: false,
                });
            } else {
                set({
                    error: 'An error occurred during signup',
                    isLoading: false,
                });
            }

            return false;
        }
    },

    signin: async (email: string, password: string): Promise<boolean> => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.post('/login', {
                email,
                password,
            });

            const { access_token, user } = response.data;

            localStorage.setItem('token', access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            set({
                token: access_token,
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.status === 422) {
                set({
                    error: error.response.data.message,
                    isLoading: false,
                });
            } else {
                set({
                    error: 'An error occurred during login',
                    isLoading: false,
                });
            }

            return false;
        }
    },

    logout: async (): Promise<boolean> => {
        try {
            set({ isLoading: true, error: null });

            await api.post('/logout');

            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];

            set({
                ...initialState,
                token: null,
                isAuthenticated: false,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                set({
                    error: error.response?.data?.message || 'Failed to logout',
                    isLoading: false,
                });
            } else {
                set({
                    error: 'An error occurred during logout',
                    isLoading: false,
                });
            }

            return false;
        }
    },

    clearError: () => set({ error: null }),

    isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
    },
}));
