<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $data['customers'] = DB::table('customers')->get();
            return $this->sendResponse("Hiển thị danh sách thành công", $data, 200);
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:255',
                'phone_number' => 'required|string|max:255||unique:customers,phone_number',
                'email' => 'required|string|max:255|unique:customers,email',
            ]);
            if ($validator->fails()) {
                return $this->sendError("Vui lòng nhập đầy đủ thông tin", $validator->errors(), 400);
            }
            DB::beginTransaction();
            $data['customer'] = Customer::create($validator->validated());
            DB::commit();
            return $this->sendResponse("Thêm thành công!", $data, 201);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $data['customer'] = Customer::find($id);
            if (empty($data['customer'])) {
                return $this->sendError("Không tìm thấy khách hàng", ["errors" => ["general" => "Không tìm thấy khách hàng"]], 404);
            }
            return $this->sendResponse("Customer fetch successfully", $data, 200);
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $data['customer'] = Customer::find($id);
            if (empty($data['customer'])) {
                return $this->sendError("Không tìm thấy khách hàng", ["errors" => ["general" => "Không tìm thấy khách hàng"]], 404);
            }

            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:255',
                'phone_number' => 'required|string|max:255||unique:customers,phone_number,' . $id,
                'email' => 'required|string|max:255|unique:customers,email,' . $id,
            ]);

            if ($validator->fails()) {
                return $this->sendError("Vui lòng nhập đầy đủ thông tin", $validator->errors(), 400);
            }

            DB::beginTransaction();
            $updateCustomerData = $validator->validated();
            $data['customer']->update($updateCustomerData);
            DB::commit();

            return $this->sendResponse("Cập nhật thành công!", $data, 201);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $data['customer'] = Customer::find($id);
            if (empty($data['customer'])) {
                return $this->sendError("Không tìm thấy khách hàng", ["errors" => ["general" => "Không tìm thấy khách hàng"]], 404);
            }else{
                DB::beginTransaction();
                $data['customer']->delete();
                DB::commit();
                return $this->sendResponse("Xóa thành công!", $data, 200);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }
}
