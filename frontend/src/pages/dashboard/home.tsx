import { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateProductTab } from '@/pages/dashboard/create-product-tab';
import { ManageProductsTab } from '@/pages/dashboard/manage-products-tab';
import { useNavigationStore } from '@/store/navigation-store';

function DashboardPage() {
    const [activeTab, setActiveTab] = useState('createProduct');
    const { history } = useNavigationStore();

    useEffect(() => {
        if (history.length > 1 && history[history.length - 2].includes('products')) {
            setActiveTab('allProducts');
        } else {
            setActiveTab('createProduct');
        }
    }, [history]);

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="createProduct">Create Product</TabsTrigger>
                    <TabsTrigger value="allProducts">Products</TabsTrigger>
                </TabsList>
                <TabsContent value="createProduct" className="mt-6">
                    <CreateProductTab />
                </TabsContent>
                <TabsContent value="allProducts" className="mt-6">
                    <ManageProductsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default DashboardPage;
