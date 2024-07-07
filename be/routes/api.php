<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// Route::group([

//     'middleware' => 'api',
//     'prefix' => 'auth'

// ], function ($router) {

//     Route::post('login', [AuthController::class, 'login']);
//     Route::post('logout', [AuthController::class, 'logout']);
//     Route::post('refresh', [AuthController::class, 'refresh']);
//     Route::get('me', [AuthController::class, 'me']);

// });
// Route::group(['middleware' => 'auth'], function($routes){
//     // Customer
//     Route::group(['prefix' => 'v1/customers'], function($routes){
//         Route::get('/list', [CustomerController::class, 'index']);
//         Route::post('/', [CustomerController::class, 'store']);
//         Route::get('/{id}', [CustomerController::class, 'show']);
//         Route::put('/{id}', [CustomerController::class, 'update']);
//         Route::delete('/{id}', [CustomerController::class, 'destroy']);
//     });

// });
Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories', [CategoryController::class, 'store']);
Route::get('categories/{category}', [CategoryController::class, 'show']);
Route::post('categories/{category}', [CategoryController::class, 'update']);
Route::delete('categories/{category}', [CategoryController::class, 'destroy']);