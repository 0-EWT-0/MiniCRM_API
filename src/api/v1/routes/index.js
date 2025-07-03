"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_router_1 = __importDefault(require("../../../modules/tags/tag.router"));
const contact_routes_1 = __importDefault(require("../../../modules/contact/contact.routes"));
const auth_routes_1 = __importDefault(require("../../../modules/auth/auth.routes"));
const leads_router_1 = __importDefault(require("../../../modules/leads/leads.router"));
const router = (0, express_1.Router)();
router.use("/tag", tag_router_1.default);
router.use("/contact", contact_routes_1.default);
router.use("/auth", auth_routes_1.default);
router.use("/leads", leads_router_1.default);
exports.default = router;
