import { ProductsGrid } from '@/components/paginated-products';
import { useProductsStore } from '@/store/products-store';

export function ShopPage() {
    const {
        pagination: { currentPage, totalProducts },
    } = useProductsStore();

    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">All Products</h2>
                <p className="text-sm text-muted-foreground mt-2">
                    {totalProducts > 0 && (
                        <>
                            Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
                        </>
                    )}
                </p>
            </div>
            <ProductsGrid />
        </div>
    );
}

export default ShopPage;
