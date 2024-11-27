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
                    'https://www.apple.com/newsroom/images/product/iphone/standard/apple-iphone-15-pro-max-model-unspec-202309_big.jpg.large.jpg',
                    'https://www.digitaltrends.com/wp-content/uploads/2023/09/iPhone-15-Pro-Max-back-camera-1.jpg'
                ])
            ],
            [
                'name' => 'Samsung Galaxy Tab S9 Ultra',
                'description' => 'Massive 14.6-inch Super AMOLED display, powerful performance for work and entertainment.',
                'price' => 1299.00,
                'discounted_price' => null,
                'category_id' => 3, // Tablets category
                'stock' => 20,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://images.samsung.com/is/image/samsung/p6pim/sg/sm-x910nzaexsp/gallery/sg-galaxy-tab-s9-ultra-sm-x910-sm-x910nzaexsp-537292307?$650_519_PNG$',
                    'https://cdn.mos.cms.futurecdn.net/6JvqSBCasrwSh8pEpRvcAD.jpg'
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
                    'https://www.apple.com/newsroom/images/product/watch/standard/apple-watch-series-9-hero_big.jpg.large.jpg',
                    'https://images.macrumors.com/article-new/2023/09/apple-watch-series-9-1.jpg'
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
                    'https://www.lg.com/us/images/monitors/md08000240/gallery/D-01.jpg',
                    'https://images.techhive.com/images/article/2019/05/lg-ultrafine-5k-display-100796560-large.jpg'
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
                    'https://store.google.com/product/pixel_8_pro_specs_images/image1.jpg',
                    'https://www.androidauthority.com/wp-content/uploads/2023/10/Google-Pixel-8-Pro-back-standing.jpg'
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
                    'https://assets2.razerzone.com/images/blade-14-2023/blade14-2023-kv-desktop.jpg',
                    'https://www.digitaltrends.com/wp-content/uploads/2023/01/Razer-Blade-14-2022-review-04.jpg'
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
                    'https://www.garmin.com/en/products/sports-fitness/fenix7/variants/fenix7-pro-solar-edition-titanium-carbon-gray-dlc-coated-with-black-band.jpg',
                    'https://cdn.mos.cms.futurecdn.net/UWPZ3j2gzqLM6MTQLssK5j.jpg'
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
                    'https://www.apple.com/newsroom/images/product/ipad/standard/apple-ipad-pro-model-unspec-202204_big.jpg.large.jpg',
                    'https://images.macrumors.com/article-new/2022/10/ipad-pro-2022-1.jpg'
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
                    'https://www.apple.com/newsroom/images/product/airpods/standard/apple-airpods-pro-2nd-gen-hero_big.jpg.large.jpg',
                    'https://images.macrumors.com/article-new/2022/09/airpods-pro-2-1.jpg'
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
                    'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u3223qe/media-gallery/monitor-u3223qe-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3337&hei=2417&qlt=100,1&resMode=sharp2&size=3337,2417&chrss=full&imwidth=5000',
                    'https://www.digitaltrends.com/wp-content/uploads/2022/03/Dell-UltraSharp-32-4K-USB-C-Hub-Monitor-U3223QE-review-04.jpg'
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
                    'https://nothing.tech/cdn/shop/files/Phone-2-Dark-Grey-Front_800x.png',
                    'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Nothing_Phone_2_official_image_4.jpg'
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
                    'https://images.samsung.com/is/image/samsung/p6pim/uk/2401/gallery/uk-galaxy-s24-ultra-s928-sm-s928bzkcxeu-thumb-539972143',
                    'https://www.trustedreviews.com/wp-content/uploads/sites/54/2024/01/Samsung-Galaxy-S24-Ultra-back-cameras.jpg'
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
                    'https://dlcdnwebimgs.asus.com/gain/F8B5CE76-4528-4F1B-8F3A-EABEBD5B8485',
                    'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/2024_ROG_Zephyrus_G14_G16_1.jpg'
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
                    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-hero-select-202011?wid=940&hei=1112&fmt=jpeg&qlt=90&.v=1604709293000',
                    'https://www.soundguys.com/wp-content/uploads/2021/01/Apple-AirPods-Max-side-view.jpg'
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
                    'https://images.samsung.com/is/image/samsung/p6pim/uk/ls49cg954suxen/gallery/uk-odyssey-g95sc-ls49cg954suxen-537265463',
                    'https://cdn.mos.cms.futurecdn.net/yWRrgThkjPE4ECvBaXKDki.jpg'
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
                    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203_GEO_US?wid=940&hei=1112&fmt=png-alpha&.v=1645065732688',
                    'https://www.digitaltrends.com/wp-content/uploads/2022/03/ipad-air-2022-review-dan-baker-11.jpg'
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
                'image_urls' => json_encode([
                    'https://lh3.googleusercontent.com/9_VvKUZMpqvwajcCPvh7GKsFVxKmWR7EfHkM7YqL7pDQm2mB7h4PQdZzqJSHVh4QUXebPQ4-kHlt_WG8=rw-w1200',
                    'https://lh3.googleusercontent.com/PB7cHvPfJRGxZMAP7gZaHiFGfVTCPfV-VxUQUz8eQ8Ov_QNGhKgf0vx9OCZIgdPuHKC5tY3MvxrWPQc=rw-w1200'
                ])
            ],
            [
                'name' => 'ASUS ROG Strix G17 Gaming Laptop',
                'description' => '17.3-inch 240Hz display, AMD Ryzen 9, RTX 4080, 32GB RAM, ultimate gaming performance.',
                'price' => 2299.99,
                'discounted_price' => 2099.99,
                'category_id' => 2, // Laptops category
                'stock' => 10,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://dlcdnwebimgs.asus.com/gain/F93C5BC3-147F-4831-9EEF-2B72689D93BE/w1000/h732',
                    'https://dlcdnwebimgs.asus.com/gain/A8B2C8BB-9C97-474B-9C34-8B8A1C435B07/w1000/h732'
                ])
            ],
            [
                'name' => 'Apple Watch Series 9',
                'description' => 'Latest Apple Watch with S9 chip, Always-On Retina display, and advanced health monitoring features.',
                'price' => 399.99,
                'discounted_price' => 379.99,
                'category_id' => 4, // Wearables category
                'stock' => 35,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-41-alum-midnight-cell-midnight-sport-band-202309_GEO_US?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693527003597',
                ])
            ],
            [
                'name' => 'Sony WF-1000XM5',
                'description' => 'Premium wireless earbuds with industry-leading noise cancellation and Hi-Res audio support.',
                'price' => 299.99,
                'discounted_price' => 279.99,
                'category_id' => 5, // Audio category
                'stock' => 25,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://electronics.sony.com/image/5d02da5c4095876280cd4d46dd6c2429?fmt=png-alpha&wid=1200',
                    'https://www.sony.com/image/5c908d474d1cb2c5c9c461a25de4b90c?fmt=png-alpha&wid=1200'
                ])
            ],
            [
                'name' => 'Microsoft Surface Laptop Studio 2',
                'description' => 'Versatile laptop with innovative design, Intel Core i7, NVIDIA RTX 4060, and 14.4-inch touchscreen.',
                'price' => 2399.99,
                'discounted_price' => 2199.99,
                'category_id' => 2, // Laptops category
                'stock' => 15,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW16e2d',
                    'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW15Zy8'
                ])
            ],
            [
                'name' => 'Xiaomi Pad 6',
                'description' => 'High-performance Android tablet with 11-inch 144Hz display and Snapdragon 870 processor.',
                'price' => 399.99,
                'discounted_price' => 349.99,
                'category_id' => 3, // Tablets category
                'stock' => 30,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://i02.appmifile.com/591_operator_sg/10/05/2023/ce8633fc86a036956fd4b7f35ba61b38.png',
                    'https://i02.appmifile.com/726_operator_sg/10/05/2023/bf8f45dd4f0e1389e96d4d54bda78b21.png'
                ])
            ],
            [
                'name' => 'Fitbit Sense 2',
                'description' => 'Advanced health smartwatch with ECG, stress management, and comprehensive fitness tracking.',
                'price' => 299.99,
                'discounted_price' => 249.99,
                'category_id' => 4, // Wearables category
                'stock' => 40,
                'featured' => false,
                'image_urls' => json_encode([
                    'https://www.fitbit.com/global/content/dam/fitbit/global/pdp/devices/sense-2/hero-static/sense2-blue-mist.png',
                    'https://www.fitbit.com/global/content/dam/fitbit/global/pdp/devices/sense-2/features/sense2-stress-management.jpg'
                ])
            ],
            [
                'name' => 'Dell Alienware 34 QD-OLED',
                'description' => '34-inch curved QD-OLED gaming monitor with 175Hz refresh rate and 0.1ms response time.',
                'price' => 1299.99,
                'discounted_price' => 1199.99,
                'category_id' => 6, // Monitors category
                'stock' => 12,
                'featured' => true,
                'image_urls' => json_encode([
                    'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/alienware/aw3423dw/media-gallery/monitor-alienware-aw3423dw-gallery-1.psd?fmt=png-alpha',
                    'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/alienware/aw3423dw/media-gallery/monitor-alienware-aw3423dw-gallery-3.psd?fmt=png-alpha'
                ])
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
