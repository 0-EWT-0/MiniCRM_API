"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const auth_service_1 = __importDefault(require("./auth.service"));
const environment_1 = __importDefault(require("../../config/environment"));
const authService = new auth_service_1.default(environment_1.default.db);
class AuthController {
    constructor(authService) {
        this.register = (0, asyncHandler_1.default)(async (req, res) => {
            const result = await this.authService.Register(req.body);
            res.status(201).json(result);
        });
        this.login = (0, asyncHandler_1.default)(async (req, res) => {
            const result = await this.authService.Login(req.body);
            res.status(200).json(result);
        });
        this.authService = authService;
    }
}
exports.default = new AuthController(authService);
