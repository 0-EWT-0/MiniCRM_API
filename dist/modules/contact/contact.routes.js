"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = __importDefault(require("./contact.controller"));
const contactRouter = (0, express_1.Router)();
contactRouter.post("/registerContact", contact_controller_1.default.RegisterContact);
exports.default = contactRouter;
