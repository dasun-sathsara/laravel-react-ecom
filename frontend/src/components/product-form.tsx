import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useCategoriesStore } from '@/store/categories-store';
import { SecondaryButtonType } from '@/types/form';
import type { ProductFormData } from '@/types/product';

interface ProductFormProps {
    form: UseFormReturn<ProductFormData>;
    onSubmit: (data: ProductFormData) => void;
    submitText: string;
    secondaryButton: SecondaryButtonType;
}

const ProductForm = ({ form, onSubmit, submitText, secondaryButton }: ProductFormProps) => {
    const navigate = useNavigate();
    const { categories, fetchCategories, isLoading } = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const imageTextBoxPlaceholder = `https://example.com/image1.jpg${'\n'}https://example.com/image2.jpg}`;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter product description"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="1"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        {...field}
                                        onChange={(e) => {
                                            const value = Math.max(0, parseInt(e.target.value) || 0);
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="discountedPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discounted Price ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        {...field}
                                        value={field.value ?? ''}
                                        onChange={(e) => {
                                            const value = e.target.value === '' ? undefined : Math.max(0, parseFloat(e.target.value));
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock (Units)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="1"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        {...field}
                                        onChange={(e) => {
                                            const value = Math.max(0, parseInt(e.target.value) || 0);
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-x-4">
                                <FormLabel>Featured Product</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="imageUrls"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URLs (One per line)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={imageTextBoxPlaceholder}
                                        className="min-h-[100px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    {secondaryButton === SecondaryButtonType.Back ? (
                        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    ) : (
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                    )}
                    <Button type="submit">{submitText}</Button>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;
