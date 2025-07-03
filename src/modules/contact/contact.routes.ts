import { Router } from "express";
import contactController from "./contact.controller";

const contactRouter = Router();

contactRouter.post("/registerContact", contactController.RegisterContact);

export default contactRouter;