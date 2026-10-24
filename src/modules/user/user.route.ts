import { Router, type Request, type Response} from "express";
import { userController } from "./user.controller";
import { pool } from "../../db";

 const router = Router();


router.post("/", userController.createUser);



// get all users

router.get("/", userController.getAllUsers);

// get single user
router.get("/:id",userController.getSingleUser );


export const userRoute = router;
