<?php

namespace App\Http\Controllers;

use App\Data\UserData;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public static function validatedata()
    {
        return UserData::getValidationRules([
            'name' => 'John Doe',
            'email' => 'berel']);
    }
}
