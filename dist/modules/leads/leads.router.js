"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leads_controller_1 = __importDefault(require("./leads.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const leadRouter = (0, express_1.Router)();
leadRouter.get("/getAllLeads/:id", authMiddleware_1.verifyToken, leads_controller_1.default.GetAllUserLeads);
leadRouter.get("/filterLead/:id", authMiddleware_1.verifyToken, leads_controller_1.default.FilterLeadsByTags);
leadRouter.patch("/updateLeadTag/:id", authMiddleware_1.verifyToken, leads_controller_1.default.UpdateLeadTag);
leadRouter.post("/createLead", authMiddleware_1.verifyToken, leads_controller_1.default.CreateLead);
exports.default = leadRouter;
