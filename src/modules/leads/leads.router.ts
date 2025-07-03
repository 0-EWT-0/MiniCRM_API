import { Router } from "express";
import leadsController from "./leads.controller";
import { verifyToken } from "../../middlewares/authMiddleware";

const leadRouter = Router();

leadRouter.get(
  "/getAllLeads/:id",
  verifyToken,
  leadsController.GetAllUserLeads
);

leadRouter.get(
  "/filterLead/:id",
  verifyToken,
  leadsController.FilterLeadsByTags
);

leadRouter.patch(
  "/updateLeadTag/:id",
  verifyToken,
  leadsController.UpdateLeadTag
);

leadRouter.post("/createLead", verifyToken, leadsController.CreateLead);

export default leadRouter;
