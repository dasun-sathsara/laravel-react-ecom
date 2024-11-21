import CategoryPage from './pages/products/products-by-category';
import CheckoutPage from './pages/checkout/checkout';
import DashboardPage from './pages/misc/dashboard';
import EditProductPage from './pages/products/edit-product';
import OrderFailurePage from './pages/orders/order-failure';
import OrdersPage from './pages/orders/my-orders';
import OrderSuccessPage from './pages/orders/order-success';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer } from './components/footer';
import { HomePage } from './pages/misc/home';
import { LoginPage } from './pages/auth/sign-in';
import { Navbar } from './components/navbar';
import { ProductPage } from './pages/products/product-info';
import { ShopPage } from './pages/products/all-products';
import { SignUpPage } from './pages/auth/sign-up';
import { Toaster } from './components/ui/toaster';
import { CategoriesPage } from './pages/categories/all-categories';
import { NotFoundPage } from './pages/misc/not-found';

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
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/orders/success" element={<OrderSuccessPage />} />
                        <Route path="/orders/failure" element={<OrderFailurePage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/admin/dashboard" element={<DashboardPage />} />
                        <Route path="/admin/products/:id/edit" element={<EditProductPage />} />

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
