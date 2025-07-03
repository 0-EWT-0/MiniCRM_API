// auth.controller.ts
import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import AuthService from "./auth.service";
import config from "../../config/environment";

const authService = new AuthService(config.db);

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.Register(req.body);
    res.status(201).json(result);
  });

  public login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.Login(req.body);
    res.status(200).json(result);
  });
}

export default new AuthController(authService);
