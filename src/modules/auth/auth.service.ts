import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { ILogin } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUserIntoDB = async (paylad: ILogin) => {
  const { email, password } = paylad;
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1 
        `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invaild Credentials !");
  }

  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);

  console.log("match", matchPassword);

  if (!matchPassword) {
    throw new Error("Invaild password!!");
  }

  //---genarate json web token---

  const jwtPayload = {
    id: user.id,
    name: user.name,
    password: user.password,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1d",
  });

  //console.log(token)
  return {
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }
}
};

export const authService = {
  loginUserIntoDB,
};
