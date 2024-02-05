<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public string $name,
        #[Email]
        public string $email,
        public string $address,
        public ?string $phone,
        public string $password,
    ) {}
}
