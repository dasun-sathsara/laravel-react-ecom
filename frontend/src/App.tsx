import CategoryPage from './pages/category';
import CheckoutPage from './pages/checkout';
import DashboardPage from './pages/dashboard';
import EditProductPage from './pages/edit-product';
import OrderFailurePage from './pages/order-failure';
import OrdersPage from './pages/orders';
import OrderSuccessPage from './pages/order-success';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CategoriesPage } from './pages/categories';
import { Footer } from './components/footer';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { Navbar } from './components/navbar';
import { ProductPage } from './pages/product';
import { ShopPage } from './pages/shop';
import { SignUpPage } from './pages/sign-up';
import { Toaster } from './components/ui/toaster';

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
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/edit-product/:productId" element={<EditProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/order-failure" element={<OrderFailurePage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
