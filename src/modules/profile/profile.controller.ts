import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {

    try {

        const result = await profileService.createProfileIntoDb(req.body);

    } catch (error:any) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: error.message,
            error: error,
            //error: error instanceof Error ? error.message : "Unknown error"
        });
    }


};


export const profileController = { createProfile };

// 8.6 = 6.28