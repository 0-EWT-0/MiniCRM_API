import { Router } from "express";
import tagController from "./tag.controller";
import { verifyToken } from "../../middlewares/authMiddleware";

const tagRouter = Router();

tagRouter.get("/getAllTags/:id", verifyToken, tagController.GetAllTags);

export default tagRouter;
