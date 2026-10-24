import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDb = async (payload: IUser) => {
    const { name, email, password, role } = payload;
    const result = await pool.query(
        `INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, password, role],
    );
    return result;
};

// get all users
const getAllusersFromDb = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
};

// get single users
const getSingleUserFromDb = async (id: string) => {
    const result = await pool.query(
        `
            SELECT * FROM users WHERE id=$1
            `, [id]
    );
    return result;
};

export const userService = { createUserIntoDb, getAllusersFromDb, getSingleUserFromDb};

// user.route.ts
// user.controller.ts
// user.service.ts
// user.interface.ts