import { AxiosError } from 'axios';
import { create, StoreApi } from 'zustand';

import { api } from '@/lib/api';
import type { User } from '@/types/user';

import { useCartStore } from './cart-store';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signupError: string | null;
    signinError: string | null;
    logoutError: string | null;
    fetchUserError: string | null;
    isInitialized: boolean;

    signup: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<boolean>;
    signin: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
    isAdmin: () => boolean;
    fetchUser: () => Promise<void>;

    clearSignupError: () => void;
    clearSigninError: () => void;
    clearLogoutError: () => void;
    clearFetchUserError: () => void;
    initialize: () => Promise<void>;
}

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    signupError: null,
    signinError: null,
    logoutError: null,
    fetchUserError: null,
    isInitialized: false,
};

const handleError = (
    error: unknown,
    set: StoreApi<AuthState>['setState'],
    defaultMessage: string,
    errorField: keyof AuthState,
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

// Add this at the top level, outside of the create function
let isStoreInitialized = false;

export const useAuthStore = create<AuthState>((set, get) => ({
    ...initialState,

    signup: async (name: string, email: string, password: string, passwordConfirmation: string): Promise<boolean> => {
        try {
            set({ isLoading: true, signupError: null });

            await api.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            set({
                isLoading: false,
                signupError: null,
            });

            return true;
        } catch (error: unknown) {
            handleError(error, set, 'An error occurred during signup', 'signupError');
            return false;
        }
    },

    signin: async (email: string, password: string): Promise<boolean> => {
        try {
            set({ isLoading: true, signinError: null });

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
                signinError: null,
            });

            useCartStore.getState().fetchCart();

            return true;
        } catch (error: unknown) {
            handleError(error, set, 'An error occurred during login', 'signinError');
            return false;
        }
    },

    logout: async (): Promise<boolean> => {
        try {
            set({ isLoading: true, logoutError: null });

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
            handleError(error, set, 'Failed to logout', 'logoutError');
            return false;
        }
    },

    clearSignupError: () => set({ signupError: null }),
    clearSigninError: () => set({ signinError: null }),
    clearLogoutError: () => set({ logoutError: null }),
    clearFetchUserError: () => set({ fetchUserError: null }),

    isAdmin: () => {
        const user = get().user;
        return user?.role === 'admin';
    },

    fetchUser: async () => {
        try {
            set({ isLoading: true, fetchUserError: null });

            const response = await api.get('/user');
            set({
                user: response.data.data,
                isAuthenticated: true,
                isLoading: false,
                fetchUserError: null,
                isInitialized: true,
            });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to fetch user', 'fetchUserError');
            set({
                isInitialized: true,
                isAuthenticated: false,
                user: null,
            });
        }
    },

    initialize: async () => {
        if (isStoreInitialized) return;
        isStoreInitialized = true;

        const token = get().token;
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await get().fetchUser();
            await useCartStore.getState().fetchCart();
        } else {
            set({ isInitialized: true });
        }
    },
}));
