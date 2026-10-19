import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
       // const { name, email, password, role } = req.body;
const result = await userService.createUserIntoDb(req.body);

        console.log(result);
        // 🌟 result.rows[0] contains the actual row saved by Postgres (including id, created_at, etc.)
        res.status(201).json({
            success: true,
            message: "created user successfully!",
            data: result.rows[0],
        });
    } catch (error: any) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: error.message,
            error: error,
            //error: error instanceof Error ? error.message : "Unknown error"
        });
    };
};
export const userController = {createUser};