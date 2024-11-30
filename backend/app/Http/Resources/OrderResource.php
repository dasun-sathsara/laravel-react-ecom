<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->created_at->format('Y-m-d'),
            'items' => OrderItemResource::collection($this->items),
            'totalPrice' => $this->items->sum('total'),
            'status' => $this->status,
        ];
    }
}
