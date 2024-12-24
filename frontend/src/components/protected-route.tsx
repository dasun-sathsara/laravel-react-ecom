import { Navigate, useLocation } from 'react-router-dom';

import { UnauthorizedPage } from '../pages/misc/unauthorized';
import { useAuthStore } from '../store/auth-store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin, isInitialized } = useAuthStore();
    const location = useLocation();

    if (!isInitialized) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin()) {
        return <UnauthorizedPage />;
    }

    return <>{children}</>;
}
