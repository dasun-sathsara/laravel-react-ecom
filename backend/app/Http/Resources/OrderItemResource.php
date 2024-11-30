<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->product_id,
            'name' => $this->product?->name,
            'quantity' => $this->quantity,
            'price' => $this->price,
        ];
    }
}
