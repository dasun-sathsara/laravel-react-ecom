import { AxiosError } from 'axios';
import { create, StoreApi } from 'zustand';

import { api } from '@/lib/api';
import type { User } from '@/types/user';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    
    signup: (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => Promise<boolean>;
    signin: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
    isAdmin: () => boolean;
    fetchUser: () => Promise<void>;

    clearError: () => void;
}

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

const handleError = (error: unknown, set: StoreApi<AuthState>['setState'], defaultMessage: string) => {
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

export const useAuthStore = create<AuthState>((set, get) => {
    const store = {
        ...initialState,

        signup: async (
            name: string,
            email: string,
            password: string,
            passwordConfirmation: string
        ): Promise<boolean> => {
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
                handleError(error, set, 'An error occurred during signup');
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
                handleError(error, set, 'An error occurred during login');
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
                handleError(error, set, 'Failed to logout');
                return false;
            }
        },

        clearError: () => set({ error: null }),

        isAdmin: () => {
            const user = get().user;
            return user?.role === 'admin';
        },

        fetchUser: async () => {
            try {
                set({ isLoading: true, error: null });
                api.defaults.headers.common['Authorization'] = `Bearer ${get().token}`;
                const response = await api.get('http://127.0.0.1:8000/api/user');
                set({
                    user: response.data,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null,
                });
            } catch (error: unknown) {
                handleError(error, set, 'Failed to fetch user');
            }
        },
    };

    if (store.isAuthenticated) {
        store.fetchUser();
        api.defaults.headers.common['Authorization'] = `Bearer ${store.token}`;
    }

    return store;
});
