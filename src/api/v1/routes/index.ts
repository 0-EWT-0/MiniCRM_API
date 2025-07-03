import { Router } from "express";
import tagRouter from "../../../modules/tags/tag.router";
import contactRouter from "../../../modules/contact/contact.routes";
import authRouter from "../../../modules/auth/auth.routes";
import leadRouter from "../../../modules/leads/leads.router";

const router = Router();

router.use("/tag", tagRouter);

router.use("/contact", contactRouter);

router.use("/auth", authRouter);

router.use("/leads", leadRouter);

export default router;
