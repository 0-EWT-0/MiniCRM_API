"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __importDefault(require("./config/environment"));
const app_1 = __importDefault(require("./app"));
const startServer = async () => {
    try {
        await environment_1.default.testDatabaseConnection();
        const app = new app_1.default();
        app.app.listen(environment_1.default.port, () => {
            console.log(`🚀 Servidor corriendo en puerto ${environment_1.default.port} en modo ${environment_1.default.nodeEnv}`);
        });
    }
    catch (error) {
        console.error("❌ No se pudo iniciar el servidor:", error);
    }
};
startServer();
