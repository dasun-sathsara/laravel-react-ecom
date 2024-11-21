import { create } from 'zustand';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

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

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

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

            // Store token in localStorage
            localStorage.setItem('token', access_token);

            // Update api default headers for subsequent requests
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
                console.log(error.response?.data);

                set({
                    error: error.response!.data!.message,
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

    logout: async () => {
        try {
            set({ isLoading: true });

            // Call the logout endpoint
            await api.post(
                '/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${useAuthStore.getState().token}`,
                    },
                },
            );

            // Clear token from localStorage
            localStorage.removeItem('token');

            // Remove Authorization header
            delete api.defaults.headers.common['Authorization'];

            // Reset store state
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                set({
                    error: error.response?.data?.message || 'Error during logout',
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

    isAdmin: (): boolean => useAuthStore.getState().user?.role === 'admin',
}));
