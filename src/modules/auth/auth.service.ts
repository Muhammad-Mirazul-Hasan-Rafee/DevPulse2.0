import bycrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { pool } from "../../db";
import config from "../../config";

const loginUserintoDb = async(payload:{email:string, password:string})=>{


    const{email, password} = payload;
    // 1. check user is exists or not
    // 2. check password is correct or not
    //3. generate token and return to user
   const userData = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email])
    
  if(userData.rows.length === 0){throw new Error('User not found! Check your passwords or email!');}

  const user = userData.rows[0];
  const matchPassword = await bycrypt.compare(password, user.password);

  console.log(matchPassword);
 
  if(!matchPassword){
    throw new Error('User not found! Check your passwords or email!');
  }

  const jwtPayload = {id:user.id,
    name: user.name,
    status: user.status,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.secretKey as string, {expiresIn: "10d"});

  return {accessToken};

  
   
};

export const authService = {loginUserintoDb};