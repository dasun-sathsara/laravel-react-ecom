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
        discountedPrice: 899,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
        discountedPrice: 650,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1601945077916-42ff4147ce03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1601945077917-cabfd715fdd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1615247170845-3a7047088065?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1605236453029-6907f1fe3692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
        imageUrls: [],
        stock: 50,
        category: 'Laptops',
        featured: true,
    },
    {
        id: '7',
        name: 'Dell XPS 13',
        description: 'Thin and light ultrabook.',
        price: 1299,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1593642632823-3de63cbca509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1525373698809-433e6b85ec09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
        imageUrls: [],
        stock: 100,
        category: 'Audio',
        featured: true,
    },
    {
        id: '11',
        name: 'Bose QuietComfort 45',
        description: 'Comfortable and immersive headphones.',
        price: 329,
        primaryImageUrl:
            'https://images.unsplash.com/photo-1598577411554-9c4431e2c240?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1600294037681-5d6e4f6c1797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1579586337278-3befd40fd0a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1579586337278-3befd40fd0a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1590650213165-c1a5c28b3133?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1502920917126-d7d7c37b0a98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1614544264619-55b7fabcad59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1615228402326-7adf9a257f2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
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
            'https://images.unsplash.com/photo-1630310984484-272d93bba9c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
        imageUrls: [],
        stock: 150,
        category: 'Accessories',
        featured: false,
    },
];

export { mockCategories, mockProducts };
