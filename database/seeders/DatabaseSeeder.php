<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
             'name' => 'Admin User',
             'email' => 'admin@gateline.test',
             'is_admin' => true,
             'password' => 12345678
         ]);
        User::factory()->create([
             'name' => 'Trail User',
             'email' => 'user@gateline.test',
             'password' => 12345678,
        ]);
    }
}
