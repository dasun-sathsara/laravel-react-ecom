import { Link } from 'react-router-dom';

export function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg text-muted-foreground mb-6">You don't have permission to access this page.</p>
            <Link to="/" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md">
                Go to Home
            </Link>
        </div>
    );
}
