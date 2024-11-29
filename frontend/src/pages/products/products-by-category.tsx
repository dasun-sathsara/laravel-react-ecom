import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProductsGrid } from '@/components/paginated-products';
import { Button } from '@/components/ui/button';
import { useProductsStore } from '@/store/products-store';

export default function CategoryPage() {
    const { id: categoryId } = useParams();
    const navigate = useNavigate();

    const {
        pagination: { currentPage, totalProducts },
        categoryName,
        error,
        fetchProducts,
    } = useProductsStore();

    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12 min-h-[calc(100vh-4rem)]">
            <Button
                variant="ghost"
                className="mb-8 -ml-2 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            {error ? (
                <div className="flex flex-col items-center justify-center space-y-6 flex-1 min-h-[70vh]">
                    <p className="text-lg text-muted-foreground text-center">{error}</p>
                    <Button variant={'outline'} onClick={() => fetchProducts(currentPage, Number(categoryId))}>
                        Try Again
                    </Button>
                </div>
            ) : (
                <>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">{categoryName}</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                            {totalProducts > 0 && (
                                <>
                                    Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts}{' '}
                                    products
                                </>
                            )}
                        </p>
                    </div>

                    <ProductsGrid categoryId={Number(categoryId)} />
                </>
            )}
        </div>
    );
}
