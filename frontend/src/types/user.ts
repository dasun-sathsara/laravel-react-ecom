interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

export type { User };
