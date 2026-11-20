import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async(req: Request, res: Response) =>{
     try {

const result = await authService.loginUserintoDb(req.body);









        res.status(201).json({
      success: true,
      message: "Profile created successfully!",
      data: result,
    });
     } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: error.message,
      error: error,
      //error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const authController = {loginUser};