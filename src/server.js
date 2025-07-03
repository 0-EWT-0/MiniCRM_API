"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __importDefault(require("./config/environment"));
const app_1 = __importDefault(require("./app"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield environment_1.default.testDatabaseConnection();
        const app = new app_1.default();
        app.app.listen(environment_1.default.port, () => {
            console.log(`🚀 Servidor corriendo en puerto ${environment_1.default.port} en modo ${environment_1.default.nodeEnv}`);
        });
    }
    catch (error) {
        console.error("❌ No se pudo iniciar el servidor:", error);
    }
});
startServer();
