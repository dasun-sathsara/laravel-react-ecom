<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'MacBook Pro 16-inch',
                'description' => 'The MacBook Pro 16-inch with Apple M1 Pro chip, 16GB RAM, and a 1TB SSD, designed for professional-grade performance and stunning visuals.',
                'price' => 2499.00,
                'discounted_price' => 2299.99,
                'category_id' => 2, // Laptops category
                'stock' => 15,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/refurb-mbp16-space-m1-2021?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1643239951000',
                    'https://sm.pcmag.com/t/pcmag_me/review/a/apple-macb/apple-macbook-pro-16-inch-2023-m3-max_cah1.1920.jpg'
                ])
            ],
            [
                'name' => 'iPhone 15 Pro Max',
                'description' => 'The ultimate iPhone with a powerful A17 Pro chip, stunning titanium design, and advanced camera system.',
                'price' => 1199.00,
                'discounted_price' => 1099.99,
                'category_id' => 1, // Smartphones category
                'stock' => 30,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://idealz.lk/wp-content/uploads/2023/09/iPhone-15-Pro-Max-Titanium.jpg',
                    'https://i5.walmartimages.com/seo/Restored-Apple-iPhone-15-Pro-Max-256GB-T-Mobile-Blue-Titanium-MU693LL-A-Excellent-Condition_dd2d42c6-cc25-4bee-81ef-7847120498d5.663475b807d168a41e9082d258d9c7ce.jpeg'
                ])
            ],
            [
                'name' => 'Samsung Galaxy Tab S9 Ultra',
                'description' => 'Massive 14.6-inch Super AMOLED display, powerful performance for work and entertainment.',
                'price' => 1299.00,
                'discounted_price' => null,
                'category_id' => 3, // Tablets category
                'stock' => 20,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://xmobile.lk/wp-content/uploads/2023/09/1-9.jpg',
                    'https://fdn.gsmarena.com/imgroot/reviews/23/samsung-galaxy-tab-s9-ultra/lifestyle/-1200w5/gsmarena_019.jpg'
                ])
            ],
            [
                'name' => 'Apple Watch Series 9',
                'description' => 'Advanced health monitoring, always-on Retina display, and powerful workout features.',
                'price' => 399.00,
                'discounted_price' => 349.99,
                'category_id' => 4, // Wearables category
                'stock' => 50,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MXLV3ref_FV99_VW_34FR+watch-case-46-aluminum-silver-nc-s10_VW_34FR+watch-face-46-aluminum-silver-s10_VW_34FR?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1725645481882',
                    'https://media1.s-nbcnews.com/i/rockcms/2023-10/191336/Series-9-Review-Cover-1-e6a7a2_1d146386ae167a247547b37756a7861536c43682.jpg'
                ])
            ],
            [
                'name' => 'LG UltraFine 5K Display',
                'description' => 'Professional-grade 5K monitor with exceptional color accuracy and crisp details.',
                'price' => 1299.99,
                'discounted_price' => null,
                'category_id' => 6, // Monitors category
                'stock' => 10,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://cdn.shoplightspeed.com/shops/633289/files/34476377/lg-lg-27-ultrafine-5k-display-5120x2880.jpg',

                    'https://shotkit.com/wp-content/uploads/bb-plugin/cache/Ultrafine-monitor-review-landscape-9aeb8d05c3a998f74abda4a7708db335-zybravgx2q47.jpg'
                ])
            ],
            [
                'name' => 'Google Pixel 8 Pro',
                'description' => 'Advanced AI features, pro-level camera system, and sleek design.',
                'price' => 999.00,
                'discounted_price' => 899.99,
                'category_id' => 1, // Smartphones category
                'stock' => 35,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://lifemobile.lk/wp-content/uploads/2023/10/8-pro-1.jpg',
                    'https://xmobile.lk/wp-content/uploads/2023/10/1-49.jpg'
                ])
            ],
            [
                'name' => 'Razer Blade 14 Gaming Laptop',
                'description' => 'Compact yet powerful gaming laptop with AMD Ryzen 9 processor and NVIDIA RTX 4070.',
                'price' => 2499.99,
                'discounted_price' => 2299.99,
                'category_id' => 2, // Laptops category
                'stock' => 15,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://m.media-amazon.com/images/I/712g5R0vkbL.jpg',
                    'https://assets3.razerzone.com/j2qzPzS7udLMbv5T9CIA_pk8fPw=/1199x799/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fhfb%2Fh17%2F9724563292190%2F240109-blade14-p10-black-1500x1000-5.jpg'
                ])
            ],
            [
                'name' => 'Garmin Fenix 7 Pro',
                'description' => 'Advanced multisport GPS smartwatch with solar charging and comprehensive fitness tracking.',
                'price' => 799.99,
                'discounted_price' => 699.99,
                'category_id' => 4, // Wearables category
                'stock' => 20,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://connectthewatts.com/wp-content/uploads/sites/11/2023/06/Garmin-Fenix-7-Pro-Review.jpg?quality=82&strip=all',
                    'https://res.garmin.com/transform/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.0,f_auto,h_400,q_auto,w_400/c_pad,h_400,w_400/v1/Product_Images/en/products/010-02777-10/v/cf-xl?pgw=1'
                ])
            ],
            [
                'name' => 'iPad Pro 12.9-inch',
                'description' => 'Powerful tablet with M2 chip, Liquid Retina XDR display, and pro-level performance.',
                'price' => 1099.00,
                'discounted_price' => 999.99,
                'category_id' => 3, // Tablets category
                'stock' => 25,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://celltronics.lk/wp-content/uploads/2022/10/Apple-iPad-Pro-M2-12.9-inch-6th-Gen-Wi-Fi.jpg',
                    'https://rangashopping.lk/wp-content/uploads/2023/01/iPad-Pro-12.9-Inch-Case-20224th-Gen-20213rd-Gen-20202nd-Gen-with-Pencil-Holder.jpg'
                ])
            ],
            [
                'name' => 'AirPods Pro (2nd Generation)',
                'description' => 'Premium wireless earbuds with active noise cancellation and spatial audio.',
                'price' => 249.99,
                'discounted_price' => 229.99,
                'category_id' => 5, // Audio category
                'stock' => 40,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://appleasia.lk/wp-content/uploads/2024/09/AirPods-Pro-2nd-generation-with-MagSafe-Charging-Case-USB%E2%80%91C1.jpg',
                    'https://img.drz.lazcdn.com/static/lk/p/b8036f7f19082938a4ec53c83dcd4648.jpg_720x720q80.jpg'
                ])
            ],
            [
                'name' => 'Dell UltraSharp 32 4K Monitor',
                'description' => 'Professional-grade 32-inch 4K monitor with exceptional color accuracy and connectivity.',
                'price' => 1099.99,
                'discounted_price' => 949.99,
                'category_id' => 6, // Monitors category
                'stock' => 15,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://geniusmobile.lk/wp-content/uploads/2024/02/MTJV3.jpeg',
                    'https://appleasia.lk/wp-content/uploads/2024/09/AirPods-Pro-2nd-generation-with-MagSafe-Charging-Case-USB%E2%80%91C4.jpg'
                ])
            ],
            [
                'name' => 'Nothing Phone (2)',
                'description' => 'Unique transparent design smartphone with innovative Glyph interface.',
                'price' => 699.00,
                'discounted_price' => 599.99,
                'category_id' => 1, // Smartphones category
                'stock' => 30,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://intl.nothing.tech/cdn/shop/files/phone-2-black_2d5e1e18-c3ed-41cd-9779-921276ce0502_750x.png?v=1688994876',
                    'https://media.wired.com/photos/64af0487da92561daff93c58/1:1/w_1490,h_1490,c_limit/Nothing-Phone-2-Review-Featured-Gear.png'
                ])
            ],
            [
                'name' => 'Samsung Galaxy S24 Ultra',
                'description' => 'Latest flagship with advanced AI features, S Pen support, and titanium frame design.',
                'price' => 1299.99,
                'discounted_price' => 1199.99,
                'category_id' => 1, // Smartphones category
                'stock' => 25,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://idealz.lk/wp-content/uploads/2024/02/S24-Ultra-Violet.jpg',
                    'https://www.zdnet.com/a/img/2024/02/02/1bfa7d30-112c-4906-83a7-ce12551b7b16/galaxy-s24-ultra.jpg'
                ])
            ],
            [
                'name' => 'ASUS ROG Zephyrus G14',
                'description' => 'Compact gaming laptop with AMD Ryzen 9 processor and RTX 4090, perfect for portable gaming.',
                'price' => 2299.99,
                'discounted_price' => 2099.99,
                'category_id' => 2, // Laptops category
                'stock' => 12,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://www.pcworld.com/wp-content/uploads/2024/04/G14_edited1.jpg?quality=50&strip=all',
                    'https://assetsio.gnwcdn.com/asus-rog-zephyrus-g14-2022-(1).jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp'
                ])
            ],
            [
                'name' => 'Apple AirPods Max',
                'description' => 'Premium over-ear headphones with spatial audio and exceptional build quality.',
                'price' => 549.00,
                'discounted_price' => 499.99,
                'category_id' => 5, // Audio category
                'stock' => 18,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://idealz.lk/wp-content/uploads/2021/04/Apple-Airpods-Max-Green.jpg',
                    'https://www.apple.com/v/airpods-max/h/images/overview/product-stories/anc/anc_airpod_max_lifestyle__duzobvqwpz42_large.jpg'
                ])
            ],
            [
                'name' => 'Samsung Odyssey G9 Gaming Monitor',
                'description' => '49-inch curved gaming monitor with 240Hz refresh rate and Quantum Mini-LED display.',
                'price' => 1999.99,
                'discounted_price' => 1799.99,
                'category_id' => 6, // Monitors category
                'stock' => 8,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://m.media-amazon.com/images/I/711HTxM8v2L._AC_SL1500_.jpg',
                    'https://assetsio.gnwcdn.com/samsung%20odyssey%20g9%20review.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp'
                ])
            ],
            [
                'name' => 'iPad Air (5th Generation)',
                'description' => 'Versatile tablet with M1 chip, 10.9-inch Liquid Retina display, and Apple Pencil support.',
                'price' => 599.00,
                'discounted_price' => 549.99,
                'category_id' => 3, // Tablets category
                'stock' => 35,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://thundermac.com/wp-content/uploads/2023/06/ipad-air-5-03-01-scaled.jpg',
                    'https://www.zdnet.com/a/img/resize/6f337795d0a771638efcebabadf66a5cce822b74/2022/03/15/76da2e7a-ef3a-4cfe-afc1-46314426570d/2022-ipad-air-fifth-generation-4.jpg?auto=webp&width=1280'
                ])
            ],
            [
                'name' => 'Google Pixel 8 Pro',
                'description' => 'Latest Google flagship with advanced AI capabilities, exceptional camera system, and pure Android experience.',
                'price' => 999.99,
                'discounted_price' => 899.99,
                'category_id' => 1, // Smartphones category
                'stock' => 18,
                'featured' => true,
                'image_urls' => json_encode([])
            ],
            [
                'name' => 'ASUS ROG Strix G17 Gaming Laptop',
                'description' => '17.3-inch 240Hz display, AMD Ryzen 9, RTX 4080, 32GB RAM, ultimate gaming performance.',
                'price' => 2299.99,
                'discounted_price' => 2099.99,
                'category_id' => 2, // Laptops category
                'stock' => 10,
                'featured' => true,
                'image_urls' => json_encode([])
            ],
            [
                'name' => 'Apple Watch Series 9',
                'description' => 'Latest Apple Watch with S9 chip, Always-On Retina display, and advanced health monitoring features.',
                'price' => 399.99,
                'discounted_price' => 379.99,
                'category_id' => 4, // Wearables category
                'stock' => 35,
                'featured' => true,
                'image_urls' => json_encode([])
            ],
            [
                'name' => 'Sony WF-1000XM5',
                'description' => 'Premium wireless earbuds with industry-leading noise cancellation and Hi-Res audio support.',
                'price' => 299.99,
                'discounted_price' => 279.99,
                'category_id' => 5, // Audio category
                'stock' => 25,
                'featured' => true,
                'image_urls' => json_encode([])
            ],
            [
                'name' => 'Microsoft Surface Laptop Studio 2',
                'description' => 'Versatile laptop with innovative design, Intel Core i7, NVIDIA RTX 4060, and 14.4-inch touchscreen.',
                'price' => 2399.99,
                'discounted_price' => 2199.99,
                'category_id' => 2, // Laptops category
                'stock' => 15,
                'featured' => true,
                'image_urls' => json_encode([])
            ],
            [
                'name' => 'Xiaomi Pad 6',
                'description' => 'High-performance Android tablet with 11-inch 144Hz display and Snapdragon 870 processor.',
                'price' => 399.99,
                'discounted_price' => 349.99,
                'category_id' => 3, // Tablets category
                'stock' => 30,
                'featured' => false,
                'image_urls' => json_encode([])
            ],
            [
                'name' => 'Fitbit Sense 2',
                'description' => 'Advanced health smartwatch with ECG, stress management, and comprehensive fitness tracking.',
                'price' => 299.99,
                'discounted_price' => 249.99,
                'category_id' => 4, // Wearables category
                'stock' => 40,
                'featured' => false,
                'image_urls' => json_encode([])
            ],
            [
                'name' => 'Dell Alienware 34 QD-OLED',
                'description' => '34-inch curved QD-OLED gaming monitor with 175Hz refresh rate and 0.1ms response time.',
                'price' => 1299.99,
                'discounted_price' => 1199.99,
                'category_id' => 6, // Monitors category
                'stock' => 12,
                'featured' => true,
                'image_urls' => json_encode([])
            ],
        ];

        foreach ($products as $productData) {
            $imageUrls = json_decode($productData['image_urls']);
            unset($productData['image_urls']);

            $product = Product::create($productData);

            foreach ($imageUrls as $imageUrl) {
                $product->images()->create([
                    'url' => $imageUrl,
                ]);
            }
        }
    }
}
