<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'featured' => $product->featured,
                    'price' => (float) $product->price,
                    'discountedPrice' => (float) $product->discounted_price,
                    'stock' => $product->stock,
                    'categoryId' => $product->category->id,
                    'categoryName' => $product->category->name,
                    'imageUrl' => $product->images->first()?->url,
                ];
            }),
        ];
    }
}
