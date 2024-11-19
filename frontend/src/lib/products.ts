export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    price: 299.99,
    discountedPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    ],
    category: "electronics"
  },
  {
    id: "2",
    title: "Smart Watch Series X",
    description: "Advanced smartwatch with health tracking, notifications, and a beautiful OLED display.",
    price: 399.99,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    ],
    category: "electronics"
  },
  {
    id: "3",
    title: "Designer Leather Backpack",
    description: "Handcrafted leather backpack with multiple compartments and premium materials.",
    price: 199.99,
    discountedPrice: 159.99,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    ],
    category: "fashion"
  }
];
