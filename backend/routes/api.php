<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Controllers\OrderController;
use App\Http\Resources\UserResource;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Public Authentication Routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Public Category Routes
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
});

// Public Product Routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);

    Route::get('/{product}', [ProductController::class, 'show'])
        ->missing(fn() => response()
            ->json(['message' => 'Product not found'], 404));
});

Route::get('/featured-products', [ProductController::class, 'featured']);

//  Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // User Routes
    Route::get('/user', fn(Request $request) => new UserResource($request->user()));
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    // Order Routes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);

    // Cart Routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/items', [CartController::class, 'store']);

    Route::delete('/cart/items/{product}', [CartController::class, 'destroy'])->missing(fn() => response()
        ->json(['message' => 'Item not found'], 404));

    Route::delete('/cart', [CartController::class, 'clear']);

    // Admin Routes
    Route::middleware(EnsureUserIsAdmin::class)->prefix('products')->group(function () {
        Route::post('/', [ProductController::class, 'store']);

        Route::put('/{product}', [ProductController::class, 'update'])->missing(fn() => response()
            ->json(['message' => 'Product not found'], 404));

        Route::delete('/{product}', [ProductController::class, 'destroy'])->missing(fn() => response()
            ->json(['message' => 'Product not found'], 404));
    });
});
