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
// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
   const result = await userService.getAllusersFromDb();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  //console.log(id);

  try {
    const result = await userService.getSingleUserFromDb(id as string);

    // if user not exists
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
// update user
const updatUser =  async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, role } = req.body;
    // console.log(id, {name, password, role});
const result = await userService.updateUserFromDb(name as string, password as string, role as string, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
   const result = await userService.deleteUserFromDb(id as string);

    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User has been deleted successfully!",
    });


  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  };

}
export const userController = {createUser, getAllUsers, getSingleUser, updatUser, deleteUser};


