<?php

use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Profiles Stuffs Routes
|--------------------------------------------------------------------------
*/

Route::post('/user-profile', [UserProfileController::class, 'registerProfile'])
    ->middleware('auth:sanctum')
    ->name('user-profile.register');

Route::put('/user-profile/{id}', [UserProfileController::class, 'updateProfile'])
    ->middleware('auth:sanctum')
    ->name('user-profile.update');
