import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useCategoriesStore } from '@/store/categories-store';
import type { ProductFormData } from '@/types/product';
import { ProductFormSchema } from '@/types/product';

enum SecondaryButtonType {
    Reset,
    Back,
}

interface ProductFormProps {
    onSubmit: (data: ProductFormData) => void;
    submitText: string;
    secondaryButton: SecondaryButtonType;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, submitText, secondaryButton }) => {
    const formWithResolver = useForm<ProductFormData>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            discountedPrice: null,
            categoryId: '',
            stock: 0,
            featured: false,
            imageUrls: [''],
        },
    });

    const [urlCount, setUrlCount] = React.useState(formWithResolver.getValues().imageUrls.length || 1);

    const navigate = useNavigate();

    const { categories, fetchCategories, isLoading } = useCategoriesStore();

    const addUrlField = () => {
        if (urlCount < 3) {
            setUrlCount(urlCount + 1);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const removeUrlField = (index: number) => {
        if (index > 0) {
            const currentUrls = formWithResolver.getValues().imageUrls || [];
            const newUrls = [...currentUrls];
            newUrls.splice(index, 1);
            formWithResolver.setValue('imageUrls', newUrls);
            setUrlCount(newUrls.length);
        }
    };

    const resetForm = () => {
        formWithResolver.reset({
            name: '',
            description: '',
            price: 0,
            discountedPrice: null,
            categoryId: '',
            stock: 0,
            featured: false,
            imageUrls: [''],
        });
        setUrlCount(1);
    };

    return (
        <Form {...formWithResolver}>
            <form onSubmit={formWithResolver.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Basic Information</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={formWithResolver.control}
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
                            control={formWithResolver.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {isLoading ? (
                                                <SelectItem value="0" disabled>
                                                    Loading...
                                                </SelectItem>
                                            ) : (
                                                categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formWithResolver.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter product description"
                                            className="min-h-[100px] resize-none"
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
                        control={formWithResolver.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Regular Price</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            {...field}
                                            onChange={e => {
                                                const value = e.target.value === '' ? 0 : e.target.valueAsNumber;
                                                field.onChange(value);
                                            }}
                                            min="0"
                                            step="0.01"
                                            className="pl-7"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formWithResolver.control}
                        name="discountedPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discounted Price (Optional)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={e => {
                                                const value = e.target.value === '' ? null : e.target.valueAsNumber;
                                                field.onChange(value);
                                            }}
                                            min="0"
                                            step="0.01"
                                            className="pl-7"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formWithResolver.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock Count</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter stock count"
                                        {...field}
                                        onChange={e => {
                                            const value = e.target.value === '' ? 0 : e.target.valueAsNumber;
                                            field.onChange(value);
                                        }}
                                        min="0"
                                        step="1"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formWithResolver.control}
                        name="featured"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Featured Product</FormLabel>
                                    <p className="text-sm text-muted-foreground">
                                        Display this product on the featured section
                                    </p>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                {/* Product URLs */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Product URLs</h2>
                        {urlCount < 3 && (
                            <Button type="button" variant="outline" size="sm" onClick={addUrlField}>
                                Add URL
                            </Button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: urlCount }).map((_, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <FormField
                                    control={formWithResolver.control}
                                    name={`imageUrls.${index}`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>
                                                {index === 0 ? 'Primary URL (Required)' : `Additional URL ${index + 1}`}
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="https://example.com/image.jpg" 
                                                    {...field}
                                                    type="url"
                                                    pattern="https?://.+"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {index > 0 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="mt-8"
                                        onClick={() => removeUrlField(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    {secondaryButton === SecondaryButtonType.Back ? (
                        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    ) : (
                        <Button type="button" variant="outline" onClick={resetForm}>
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

export { SecondaryButtonType };
