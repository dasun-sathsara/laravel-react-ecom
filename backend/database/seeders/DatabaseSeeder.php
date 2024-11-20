<?php

namespace Database\Seeders;



use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Dasun',
            'email' => 'dasun@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);
    }
}
