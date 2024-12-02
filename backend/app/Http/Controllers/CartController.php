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

        $product = Product::findOrFail($request->id);
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

    public function destroy($productId): JsonResponse
    {
        $cart = Cart::where('user_id', Auth::user()->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        $item = $cart->items()->where('product_id', $productId)->first();

        if (!$item) {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    public function clear(): JsonResponse
    {
        $cart = Cart::where('user_id', Auth::user()->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart is already empty']);
        }

        $cart->items()->delete();

        return response()->json(['message' => 'Cart cleared successfully']);
    }
}
