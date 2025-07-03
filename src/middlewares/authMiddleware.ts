import { Request as ExpressRequest, Response, NextFunction } from "express";
import auth from "../utils/auth";
import asyncHandler from "../utils/asyncHandler";

export interface AuthenticatedRequest extends ExpressRequest {
  user?: any;
}

export const verifyToken = asyncHandler<AuthenticatedRequest>(
  async (req, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = await auth.verifyToken(token);
    req.user = decoded.data;

    next();
  }
);
