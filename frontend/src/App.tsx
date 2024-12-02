import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ProtectedRoute } from '@/components/protected-route';
import { Toaster } from '@/components/ui/toaster';
import { LoginPage } from '@/pages/auth/sign-in';
import { SignUpPage } from '@/pages/auth/sign-up';
import { CategoriesPage } from '@/pages/categories/all-categories';
import CheckoutPage from '@/pages/checkout/checkout';
import DashboardPage from '@/pages/misc/dashboard';
import { HomePage } from '@/pages/misc/home';
import { NotFoundPage } from '@/pages/misc/not-found';
import OrdersPage from '@/pages/orders/my-orders';
import OrderFailurePage from '@/pages/orders/order-failure';
import OrderSuccessPage from '@/pages/orders/order-success';
import { ShopPage } from '@/pages/products/all-products';
import EditProductPage from '@/pages/products/edit-product';
import { ProductPage } from '@/pages/products/product-info';
import CategoryPage from '@/pages/products/products-by-category';

function App() {
    return (
        <Router>
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

export default App;
