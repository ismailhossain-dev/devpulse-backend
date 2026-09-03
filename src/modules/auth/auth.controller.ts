import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { authService } from "./auth.service";

const loginUser = async(req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    console.log("controller", result)
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Login successful",
      data:result
    });
  } catch (error: any) {
    sendResponse(res, {
        success: false,
        statusCode: 500,
        message: error.message,
        error: error
    })
  }
};

export const authController = {
  loginUser,
};
