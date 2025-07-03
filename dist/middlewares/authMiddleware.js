"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const auth_1 = __importDefault(require("../utils/auth"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.verifyToken = (0, asyncHandler_1.default)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token no proporcionado" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const decoded = await auth_1.default.verifyToken(token);
    req.user = decoded.data;
    next();
});
