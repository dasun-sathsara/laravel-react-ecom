import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

import { ProductsGrid } from '@/components/paginated-products';
import { Button } from '@/components/ui/button';
import { useProductsStore } from '@/store/products-store';

export function ShopPage() {
    const {
        pagination: { currentPage, totalProducts },
        fetchProductsError,
        fetchProducts,
    } = useProductsStore();


    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12"
        >
            {fetchProductsError ? (
                <div className="flex flex-col items-center justify-center space-y-6 flex-1 min-h-[70vh]">
                    <div className="text-center space-y-4">
                        <AlertCircle className="h-10 w-10 mx-auto" />
                        <h2 className="text-2xl font-semibold tracking-tight">Error Loading Products</h2>
                        <p className="text-base text-muted-foreground max-w-md mx-auto">{fetchProductsError}</p>
                    </div>
                    <Button variant={'outline'} onClick={() => fetchProducts(currentPage)}>
                        Try Again
                    </Button>
                </div>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-3">All Products</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                            {totalProducts > 0 && (
                                <>
                                    Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts}{' '}
                                    products
                                </>
                            )}
                        </p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        <ProductsGrid />
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}

export default ShopPage;
