<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Http\Resources\CartResource;
use App\Http\Requests\StoreCartRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $cart = Cart::firstOrCreate([
            'user_id' => Auth::user()->id
        ]);

        return new CartResource($cart->load('items'));
    }

    public function store(StoreCartRequest $request): JsonResponse
    {
        $cart = Cart::firstOrCreate([
            'user_id' => Auth::user()->id
        ]);

        $product = Product::findOrFail($request->productId);
        $quantity = $request->quantity;

        $existingItem = $cart->items()->where('product_id', $product->id)->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + $quantity
            ]);
              $cartItem = $existingItem;
        } else {
            $cartItem = $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity
            ]);
        }

        return response()->json([
            'message' => $quantity > 1 ? "$quantity items added to cart" : 'Item added to cart',
        ], 201);
    }

    public function destroy(CartItem $item): JsonResponse
    {
        if ($item->cart->user_id !== Auth::user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }
}
