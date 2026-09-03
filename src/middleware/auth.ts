import type { Request, Response, NextFunction } from "express";
import type { ROLES } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = (...roles: ROLES[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
   const token = req.headers.authorization?.split(" ")[1];

    //console.log("token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access!!",
      });
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;

    //console.log("decoded:", decoded);

    const userData = await pool.query(
      `
        SELECT * FROM users WHERE email = $1
      `,
      [decoded.email]
    );

    if (userData.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const user = userData.rows[0];

    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden!",
      });
    }

    req.user = decoded;

    next();
  };
};

export default auth;