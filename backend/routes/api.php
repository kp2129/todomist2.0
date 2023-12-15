<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth'], function () {
  Route::post('login', [AuthController::class, 'login']);
  Route::post('register', [AuthController::class, 'register']);
  Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('logout', [AuthController::class, 'logout']);
  });
});


Route::get('/get', [TodoController::class, 'show']);
Route::group(['middleware' => 'auth:sanctum'], function () {
  Route::get('/user', [AuthController::class, 'user']);
  Route::post('/createTask', [TodoController::class, 'store']);
  Route::post('/updateTask/{id}', [TodoController::class, 'update']);
  Route::delete('/{id}', [TodoController::class, 'destroy']);
});

Route::group(['middleware' => 'auth:sanctum'], function () {
  Route::get('/search/{query}', [TodoController::class, 'search']);
});
