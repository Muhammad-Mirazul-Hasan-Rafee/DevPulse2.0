import { pool } from "../../db";

const createProfileIntoDb = async(payload: any) =>{
const {reporter_id, description, type, status} = payload;

// first check user is exists
 const user = await pool.query(`
    SELECT * FROM users WHERE id=$1
    `, [reporter_id]);
console.log(user);
if(user.rows.length === 0){
 throw new Error('User not exists!')
}

const result = await pool.query(`INSERT INTO issues(reporter_id, description, type, status) VALUES($1, $2, $3, $4) RETURNING * `,[reporter_id, description, type, status]);
return result;
};

export const profileService = {createProfileIntoDb};

// 8.6 done