<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Category;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Add an admin and a regular user

        User::factory()->create([
            'name' => 'Dasun',
            'email' => 'dasun@admin.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        User::factory()->create([
            'name' => 'Dasun',
            'email' => 'dasun@user.com',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]);


        // Create the 6 categories

        $categories = [
            [
                'name' => 'Smartphones',
                'description' => 'Latest smartphones with cutting-edge features.',
                'image_url' => 'https://www.zdnet.com/a/img/resize/64acd38781e1da87bf15c24e3c615cf744e46df7/2024/09/20/749bdace-bab4-432c-861d-bb2edb609601/img-0038.jpg?auto=webp&fit=crop&height=900&width=1200',
            ],
            [
                'name' => 'Laptops',
                'description' => 'High-performance laptops for all your needs.',
                'image_url' => 'https://assets2.razerzone.com/images/pnx.assets/7fb8deac5d3c73e360bc687ed62be6cf/gaming-laptops-og-image.webp',
            ],
            [
                'name' => 'Tablets',
                'description' => 'Top tablets for productivity and entertainment.',
                'image_url' => 'https://cdn.mos.cms.futurecdn.net/3Y5PQVLsQTK6K5n2Q3mdWS-1200-80.jpg',
            ],
            [
                'name' => 'Wearables',
                'description' => 'Smartwatches and fitness trackers.',
                'image_url' => 'https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj.jpg',
            ],
            [
                'name' => 'Audio',
                'description' => 'Headphones, earbuds, and speakers.',
                'image_url' => 'https://www.sennheiser.com/globalassets/digizuite/45735-en-hd_490_pro_product_shot_in_use_axis_audio_69.jpg/SennheiserFullWidth',
            ],
            [
                'name' => 'Monitors',
                'description' => 'High-quality monitors for work and play.',
                'image_url' => 'https://images.samsung.com/is/image/samsung/assets/sg/members/article-assets/gaming-monitors/img-kv-2.jpg?$ORIGIN_JPG$',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
