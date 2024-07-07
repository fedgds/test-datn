<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    // Lấy danh sách categories
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    // Lưu category mới
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
        }

        $category = Category::create([
            'name' => $validatedData['name'],
            'image' => $imagePath,
        ]);

        return response()->json($category, 201);
    }
    public function show($id)
    {
        $category = Category::find($id);
        if ($category->image) {
            $category->image = asset('storage/' . $category->image);
        }
        return response()->json($category);
    }


    // Cập nhật category
    public function update(Request $request, Category $category)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu tồn tại
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            // Lưu ảnh mới
            $imagePath = $request->file('image')->store('categories', 'public');
            $category->image = $imagePath;
        }

        $category->name = $validatedData['name'];
        $category->save();

        return response()->json($category);
    }

    // Xóa category
    public function destroy(Category $category)
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        $category->delete();

        return response()->json(null, 204);
    }
}

