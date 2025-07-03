"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está definido.");
        }
        this.secret = process.env.JWT_SECRET;
    }
    generateToken(details) {
        if (!details?.sessionData || typeof details.sessionData !== "object") {
            throw new Error("Detalles inválidos para JWT");
        }
        const sanitizedData = Object.entries(details.sessionData).reduce((acc, [key, val]) => {
            if (key !== "password" && typeof val !== "function") {
                acc[key] = val;
            }
            return acc;
        }, {});
        const payload = { data: sanitizedData };
        const options = {
            expiresIn: details.maxAge,
            algorithm: "HS256",
        };
        return jsonwebtoken_1.default.sign(payload, this.secret, options);
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, this.secret, (err, decoded) => {
                if (err)
                    return reject(err);
                resolve(decoded);
            });
        });
    }
}
exports.default = new Auth();
