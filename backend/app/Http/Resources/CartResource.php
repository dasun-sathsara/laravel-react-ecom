<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $items = $this->whenLoaded('items', function () {
            return $this->items->map(function ($item) {
                $product = $item->product;
                $price = $product->price;
                $discountedPrice = $product->discounted_price;

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'imageUrl' => $product->images()->first()->url,
                    'quantity' => $item->quantity,
                    'price' => (float) $price,
                    'discountedPrice' => (float)$discountedPrice
                ];
            });
        }, []);

        $total = collect($items)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });

        $totalDiscount = collect($items)->sum(function ($item) {
            return ($item['price'] - $item['discountedPrice']) * $item['quantity'];
        });

        return [
            'items' => $items,
            'totalPrice' => $total,
            'totalDiscount' => $totalDiscount,
            'totalItems' => count($items)
        ];
    }
}
