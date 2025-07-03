"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/v1/routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setupMiddlewares();
        this.setupRoutes();
    }
    setupMiddlewares() {
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:5173", // aca va el puerto del front
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    setupRoutes() {
        this.app.get("/", (req, res) => {
            res.send("Welcome to the Mini CRM API!");
        });
        this.app.use("/api/v1", routes_1.default);
    }
}
exports.default = App;
