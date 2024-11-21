import { ProductsGrid } from '@/components/paginated-products';

export function ShopPage() {
    // TODO:
    const startIndex = 0;
    const endIndex = 0;
    const length = 12;

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">All Products</h2>
                <p className="text-sm text-muted-foreground mt-2">
                    Showing {startIndex + 1}-{Math.min(endIndex, length)} of {length} products
                </p>
            </div>
            <ProductsGrid />
        </div>
    );
}

export default ShopPage;
