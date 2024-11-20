<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum', EnsureUserIsAdmin::class])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index']);
});
