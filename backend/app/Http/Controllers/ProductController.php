<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images']);

        if ($categoryId = $request->query('categoryId')) {
            if (!Category::find($categoryId)) {
                return response()->json(['message' => 'Category not found'], 404);
            }
            $query->where('category_id', $categoryId);
        }

        return new ProductCollection($query->paginate(12));
    }

    public function store(StoreProductRequest $request)
    {
        try {
            return DB::transaction(function () use ($request) {
                $validated = $request->validated();

                // Create the product
                $product = Product::create([
                    'name' => $validated['name'],
                    'description' => $validated['description'],
                    'price' => $validated['price'],
                    'discounted_price' => $validated['discountedPrice'] ?? null,
                    'category_id' => $validated['categoryId'],
                    'stock' => $validated['stock'],
                    'featured' => $validated['featured'] ?? false,
                ]);

                // Store product images
                foreach ($validated['imageUrls'] as $image_url) {
                    $product->images()->create([
                        'url' => $image_url,
                    ]);
                }

                // Load relationships and return response
                return response()->json([
                    'message' => 'Product created successfully',
                    'data' => $product->load(['category', 'images'])
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Product $product)
    {
        return new ProductResource(
            $product->load(['category', 'images'])
        );
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        // Update basic product details
        $product->fill([
            'name' => $validated['name'] ?? $product->name,
            'description' => $validated['description'] ?? $product->description,
            'price' => $validated['price'] ?? $product->price,
            'discounted_price' => $validated['discountedPrice'] ?? $product->discounted_price,
            'category_id' => $validated['categoryId'] ?? $product->category_id,
            'stock' => $validated['stock'] ?? $product->stock,
            'featured' => $validated['featured'] ?? $product->featured,
        ])->save();

        // Update images if provided
        if (isset($validated['imageUrls'])) {
            // Delete existing images
            $product->images()->delete();

            // Add new images
            foreach ($validated['imageUrls'] as $image_url) {
                $product->images()->create([
                    'url' => $image_url,
                ]);
            }
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'data' =>  new ProductResource($product->load(['category', 'images']))
        ]);
    }

    public function destroy(Product $product)
    {
        // Delete associated images first
        $product->images()->delete();

        // Delete the product
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }

    public function featured()
    {
        return new ProductCollection(
            Product::with(['category', 'images'])
                ->where('featured', true)
                ->get()
                ->take(8)
        );
    }
}
