"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
class Config {
    constructor() {
        this.port = Number(process.env.PORT || 3000);
        this.nodeEnv = String(process.env.NODE_ENV || "development");
        this.dbUrl = process.env.DATABASE_URL;
        this.db = new pg_1.Pool({
            connectionString: this.dbUrl,
            ssl: process.env.DATABASE_SSL === "true"
                ? { rejectUnauthorized: false }
                : false,
        });
    }
    async testDatabaseConnection() {
        try {
            const result = await this.db.query("SELECT NOW()");
            console.log("✅ Conexión a PostgreSQL establecida:", result.rows[0].now);
        }
        catch (err) {
            console.error("❌ Error conectando a PostgreSQL:", err.message);
        }
    }
}
exports.default = new Config();
