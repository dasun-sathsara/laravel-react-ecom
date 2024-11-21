import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

interface ProductFormData {
    productName: string;
    description: string;
    price: string;
    discountedPrice: string;
    isFeatured: boolean;
    stockCount: number;
    category: string;
    productUrls: string[];
    images: string[];
}

enum SecondaryButtonType {
    Reset,
    Back,
}

interface ProductFormProps {
    form: UseFormReturn<ProductFormData>;
    onSubmit: (data: ProductFormData) => void;
    submitText: string;
    secondaryButton: SecondaryButtonType;
}

const ProductForm: React.FC<ProductFormProps> = ({ form, onSubmit, submitText, secondaryButton }) => {
    const [urlCount, setUrlCount] = React.useState(1);
    const navigate = useNavigate();

    const addUrlField = () => {
        if (urlCount < 3) {
            setUrlCount(urlCount + 1);
        }
    };

    const removeUrlField = (index: number) => {
        if (index > 0) {
            // Don't remove the first URL field as it's mandatory
            const currentUrls = form.getValues().productUrls || [];
            const newUrls = [...currentUrls];
            newUrls.splice(index, 1);
            form.setValue('productUrls', newUrls);
            setUrlCount(urlCount - 1);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Basic Information</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="productName"
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
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="electronics">Electronics</SelectItem>
                                            <SelectItem value="clothing">Clothing</SelectItem>
                                            <SelectItem value="books">Books</SelectItem>
                                            <SelectItem value="home">Home & Garden</SelectItem>
                                            <SelectItem value="sports">Sports & Outdoors</SelectItem>
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
                        control={form.control}
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
                                            step="0.01"
                                            placeholder="0.00"
                                            {...field}
                                            className="pl-7"
                                        />
                                    </div>
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
                                <FormLabel>Discounted Price (Optional)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            {...field}
                                            className="pl-7"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stockCount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock Count</FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" placeholder="Enter stock count" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isFeatured"
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
                                    control={form.control}
                                    name={`productUrls.${index}`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>
                                                {index === 0 ? 'Primary URL (Required)' : `Additional URL ${index + 1}`}
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter product URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {index > 0 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="mt-8"
                                        onClick={() => removeUrlField(index)}
                                    >
                                        ×
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

export { SecondaryButtonType };
export type { ProductFormData };
