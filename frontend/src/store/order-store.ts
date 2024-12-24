import { AxiosError } from 'axios';
import { create, StoreApi } from 'zustand';

import { api } from '@/lib/api';
import type { Order, OrderCreate } from '@/types/order';

interface OrderState {
    orders: Order[];
    isLoading: boolean;
    fetchOrdersError: string | null;
    createOrderError: string | null;

    fetchOrders: () => Promise<void>;
    createOrder: (order: OrderCreate) => Promise<void>;

    clearFetchOrdersError: () => void;
    clearCreateOrderError: () => void;

    reset: () => void;
}

const handleError = (
    error: unknown,
    set: StoreApi<OrderState>['setState'],
    defaultMessage: string,
    errorField: keyof OrderState,
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

export const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    isLoading: false,
    fetchOrdersError: null,
    createOrderError: null,

    fetchOrders: async () => {
        try {
            set({ isLoading: true, fetchOrdersError: null });
            const response = await api.get('/orders');
            set({
                orders: response.data.data,
                isLoading: false,
                fetchOrdersError: null,
            });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to fetch orders', 'fetchOrdersError');
        }
    },

    createOrder: async (order: OrderCreate) => {
        try {
            set({ isLoading: true, createOrderError: null });
            await api.post('/orders', order);
            set({ isLoading: false, createOrderError: null });
        } catch (error: unknown) {
            handleError(error, set, 'Failed to create order', 'createOrderError');
        }
    },

    clearFetchOrdersError: () => set({ fetchOrdersError: null }),
    clearCreateOrderError: () => set({ createOrderError: null }),

    reset: () => set({ orders: [], isLoading: false, fetchOrdersError: null, createOrderError: null }),
}));
