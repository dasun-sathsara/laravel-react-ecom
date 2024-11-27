import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';
import { UnauthorizedPage } from '../pages/misc/unauthorized';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin()) {
        return <UnauthorizedPage />;
    }

    return <>{children}</>;
}
