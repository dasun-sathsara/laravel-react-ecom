import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ProtectedRoute } from '@/components/protected-route';
import { Toaster } from '@/components/ui/toaster';
import { LoginPage } from '@/pages/auth/sign-in';
import { SignUpPage } from '@/pages/auth/sign-up';
import { CategoriesPage } from '@/pages/categories/all-categories';
import CheckoutPage from '@/pages/checkout/checkout';
import DashboardPage from '@/pages/dashboard/home';
import { HomePage } from '@/pages/misc/home';
import { NotFoundPage } from '@/pages/misc/not-found';
import OrdersPage from '@/pages/orders/my-orders';
import OrderFailurePage from '@/pages/orders/order-failure';
import OrderSuccessPage from '@/pages/orders/order-success';
import { ShopPage } from '@/pages/products/all-products';
import EditProductPage from '@/pages/products/edit-product';
import { ProductPage } from '@/pages/products/product-info';
import CategoryPage from '@/pages/products/products-by-category';
import { useAuthStore } from '@/store/auth-store';
import { useNavigationStore } from '@/store/navigation-store';

function App() {
    const initialize = useAuthStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <Router>
            <NavigationListener />
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/categories/:id" element={<CategoryPage />} />
                        <Route path="/products/:id" element={<ProductPage />} />
                        // Protected routes
                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute>
                                    <CheckoutPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders/success"
                            element={
                                <ProtectedRoute>
                                    <OrderSuccessPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders/failure"
                            element={
                                <ProtectedRoute>
                                    <OrderFailurePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute>
                                    <OrdersPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute requireAdmin>
                                    <DashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/products/:id/edit"
                            element={
                                <ProtectedRoute requireAdmin>
                                    <EditProductPage />
                                </ProtectedRoute>
                            }
                        />
                        // 404
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
                <Toaster />
            </div>
        </Router>
    );
}

function NavigationListener() {
    const location = useLocation();
    const pushToHistory = useNavigationStore((state) => state.pushToHistory);

    useEffect(() => {
        const path = location.pathname + location.search;
        pushToHistory(path);
    }, [location, pushToHistory]);

    return null;
}

export default App;
