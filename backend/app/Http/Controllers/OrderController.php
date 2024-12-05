<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->where('user_id', Auth::user()->id)->latest()->get();

        return OrderResource::collection($orders);
    }

    public function store(StoreOrderRequest $request)
    {
        try {   
            return DB::transaction(function () use ($request) {
                $order = Order::create([
                    'user_id' => Auth::user()->id,
                    'status' => $request->status
                ]);

                foreach ($request->items as $item) {
                    $product = Product::findOrFail($item['id']);
                    $order->items()->create([
                        'product_id' => $item['id'],
                        'quantity' => $item['quantity'],
                        'price' => $product->price,
                        'total' => $product->price * $item['quantity']
                    ]);
                }

                return new OrderResource($order->load('items'));
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating order',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
