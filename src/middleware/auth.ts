import type { Request, Response, NextFunction } from "express";
import type { ROLES } from "../types";
import sendResponse from "../utility/sendResponse";
import jwt from "jsonwebtoken";
import config from "../config";
const auth = (...roles: ROLES[]) => {
  //return use na korle issuse.route.ts err dive
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(roles)
      const token = req.headers.authorization;
      console.log("ei token " , token)
      if (!token) {
        return sendResponse(res, {
          success: false,
          statusCode: 401,
          message: "Unautorized access!",
        });
      }

      const decoded = jwt.verify(token as string, config.secret as string);
      console.log("decodeddd", decoded);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
