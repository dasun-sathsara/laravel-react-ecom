import { create } from 'zustand';

interface NavigationState {
    history: string[];
    pushToHistory: (path: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    history: ['/'],

    pushToHistory: (path) => {
        set((state) => ({
            history: [...state.history.slice(-9), path].filter(Boolean),
        }));
    },
}));
