"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_controller_1 = __importDefault(require("./tag.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const tagRouter = (0, express_1.Router)();
tagRouter.get("/getAllTags", authMiddleware_1.verifyToken, tag_controller_1.default.GetAllTags);
exports.default = tagRouter;
