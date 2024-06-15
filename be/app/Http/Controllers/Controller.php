<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function sendResponse($message = "Thao tác thành công", $data = null, $responseCode = 200) {
        return response()->json(["error" => false, "message" => $message, "data" => $data], $responseCode);
    }

    public function sendError($message = "Thao tác thất bại", $data = null, $responseCode = 400) {
        return response()->json(["error" => true, "message" => $message, "data" => $data], $responseCode);
    }

    public function handleException(Exception $e, $sendResponse = true) {
        $data['exception_message'] = $e->getMessage();
        $data['exception_code'] = $e->getCode();
        $data['exception_line'] = $e->getLine();
        $data['exception_file'] = $e->getFile();
        Log::error("Exception Message: " . $data['exception_message'] . " __LINE__ " . $data['exception_line'] . " __FILE__ " . $data['exception_file']);
        
        if($sendResponse){
            return $this->sendError("Something went wrong", $data, 500);
        }else{
            return null;
        }
    }
}
