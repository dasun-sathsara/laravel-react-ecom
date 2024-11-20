import { Category } from '@/types/category';
import { Product } from '@/types/product';

const mockCategories: Category[] = [
    {
        name: 'Smartphones',
        imageUrl:
            'https://images.unsplash.com/photo-1529778873920-cc4580d78e05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnRwaG9uZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        totalProducts: 5,
        description: 'Latest smartphones with cutting-edge technology.',
    },
    {
        name: 'Laptops',
        imageUrl:
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a889?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA&auto=format&fit=crop&w=500&q=60',
        totalProducts: 4,
        description: 'Powerful laptops for work and play.',
    },
    {
        name: 'Audio',
        imageUrl:
            'https://images.unsplash.com/photo-1505740497610-8ff2d61d3f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        totalProducts: 3,
        description: 'Immersive audio experience with headphones and speakers.',
    },
    {
        name: 'Smartwatches',
        imageUrl:
            'https://images.unsplash.com/photo-1579585830080-07149d27e1dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNtYXJ0d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        totalProducts: 3,
        description: 'Stay connected with stylish smartwatches.',
    },
    {
        name: 'Cameras',
        imageUrl:
            'https://images.unsplash.com/photo-1518495991096-247452e7b776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fA&auto=format&fit=crop&w=500&q=60',
        totalProducts: 3,
        description: 'Capture stunning moments with our high-quality cameras.',
    },
    {
        name: 'Accessories',
        imageUrl:
            'https://images.unsplash.com/photo-1587826988024-81e5e9a77be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlY2glMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        totalProducts: 2,
        description: 'Enhance your tech experience with our accessories.',
    },
];

const mockProducts: Product[] = [
    // Smartphones
    {
        id: '1',
        name: 'Nova X Pro',
        description: 'Flagship smartphone with amazing camera.',
        price: 999,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1611186871348-b1ce696e7487?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 100,
        category: 'Smartphones',
        featured: true,
    },
    {
        id: '2',
        name: 'Galaxy S23',
        description: 'Powerful and sleek smartphone.',
        price: 899,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1580490578177-2d5776772462?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnRwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 150,
        category: 'Smartphones',
        featured: false,
    },
    {
        id: '3',
        name: 'Pixel 7 Pro',
        description: 'Smartphone with advanced AI features.',
        price: 799,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1523811895853-91b794523f93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 80,
        category: 'Smartphones',
        featured: true,
    },
    {
        id: '4',
        name: 'iPhone 14',
        description: 'Premium smartphone with iOS.',
        price: 999,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1664017817395-090799210c6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 120,
        category: 'Smartphones',
        featured: false,
    },
    {
        id: '5',
        name: 'OnePlus 11',
        description: 'Fast and smooth smartphone experience.',
        price: 699,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 90,
        category: 'Smartphones',
        featured: true,
    },

    // Laptops
    {
        id: '6',
        name: 'MacBook Pro',
        description: 'Powerful laptop for professionals.',
        price: 1999,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a889?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 50,
        category: 'Laptops',
        featured: true,
    },
    // ... (Add 3 more laptops)
    {
        id: '7',
        name: 'Dell XPS 13',
        description: 'Thin and light ultrabook.',
        price: 1299,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1611475788923-4a74a6a18a75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',

        imageUrls: [],
        stock: 70,
        category: 'Laptops',
        featured: false,
    },
    {
        id: '8',
        name: 'HP Spectre x360',
        description: 'Convertible laptop with stylus support.',
        price: 1499,
        primaryImageUrl:
            'https://plus.unsplash.com/premium_photo-1661698707183-c9f7a1d64641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 60,
        category: 'Laptops',
        featured: true,
    },
    {
        id: '9',
        name: 'Lenovo ThinkPad X1 Carbon',
        description: 'Durable and reliable business laptop.',
        price: 1799,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 40,
        category: 'Laptops',
        featured: false,
    },

    // Audio
    {
        id: '10',
        name: 'Sony WH-1000XM5',
        description: 'Noise-cancelling headphones.',
        price: 399,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 100,
        category: 'Audio',
        featured: true,
    },

    // ... (Add 2 more audio products)
    {
        id: '11',
        name: 'Bose QuietComfort 45',
        description: 'Comfortable and immersive headphones.',
        price: 329,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1622547748225-39f9a2bacb60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHBob25lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 120,
        category: 'Audio',
        featured: false,
    },
    {
        id: '12',
        name: 'Apple AirPods Pro',
        description: 'Wireless earbuds with noise cancellation.',
        price: 249,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1509414205606-792d5d95f2b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGVhcmJ1ZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 150,
        category: 'Audio',
        featured: true,
    },

    // Smartwatches
    {
        id: '13',
        name: 'Apple Watch Series 8',
        description: 'Advanced health and fitness tracking.',
        price: 499,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1579585830080-07149d27e1dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNtYXJ0d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 80,
        category: 'Smartwatches',
        featured: true,
    },
    {
        id: '14',
        name: 'Samsung Galaxy Watch 5',
        description: 'Stylish smartwatch with comprehensive features.',
        price: 399,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1523760048586-29a1f302871f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 100,
        category: 'Smartwatches',
        featured: false,
    },
    {
        id: '15',
        name: 'Garmin Venu 2',
        description: 'GPS smartwatch for fitness enthusiasts.',
        price: 299,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1611166977610-eb7c7b905ccd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHNtYXJ0d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 70,
        category: 'Smartwatches',
        featured: true,
    },

    // Cameras
    {
        id: '16',
        name: 'Sony Alpha 7 III',
        description: 'Full-frame mirrorless camera.',
        price: 1999,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1518495991096-247452e7b776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 40,
        category: 'Cameras',
        featured: true,
    },
    {
        id: '17',
        name: 'Canon EOS R6',
        description: 'High-performance mirrorless camera.',
        price: 2499,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1583508915901-b5f84c1dc40b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 50,
        category: 'Cameras',
        featured: false,
    },

    {
        id: '18',
        name: 'Fujifilm X-T4',
        description: 'Versatile mirrorless camera with retro design.',
        price: 1699,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1572635148818-ef6fd30c98e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 60,
        category: 'Cameras',
        featured: true,
    },

    // Accessories
    {
        id: '19',
        name: 'Wireless Charging Pad',
        description: 'Fast and convenient wireless charging.',
        price: 49,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1587826988024-81e5e9a77be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlY2glMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 200,
        category: 'Accessories',
        featured: true,
    },
    {
        id: '20',
        name: 'Portable Power Bank',
        description: 'High-capacity power bank for on-the-go charging.',
        price: 79,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1485145730235-afc679751e10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRlY2glMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        imageUrls: [],
        stock: 150,
        category: 'Accessories',
        featured: false,
    },
];

export { mockCategories, mockProducts };
