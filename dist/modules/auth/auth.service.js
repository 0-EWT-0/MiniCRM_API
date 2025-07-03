"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = __importDefault(require("../../utils/auth"));
class AuthService {
    constructor(db) {
        this.db = db;
    }
    async Register(user) {
        const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
        if (user.is_accepted === true) {
            const query = `
        INSERT INTO users_crm (name, email, password)
        VALUES ($1, $2, $3)
        `;
            const values = [user.name, user.email, hashedPassword];
            await this.db.query(query, values);
            return { message: "Usuario registrado correctamente" };
        }
        else if (user.is_accepted === false) {
            return { message: "Terminos no aceptados" };
        }
        else {
            throw new Error("Error al registrar el usuario");
        }
    }
    async Login(user) {
        try {
            const query = `
      SELECT user_id, name, email, password
      FROM users_crm
      WHERE email = $1
    `;
            const result = await this.db.query(query, [user.email]);
            const dbUser = result.rows[0];
            if (!dbUser)
                throw new Error("Usuario no encontrado");
            const isValid = await bcrypt_1.default.compare(user.password, dbUser.password);
            if (!isValid)
                throw new Error("Contraseña incorrecta");
            const token = auth_1.default.generateToken({
                sessionData: {
                    id: dbUser.user_id,
                    name: dbUser.name,
                    email: dbUser.email,
                },
                maxAge: 600 * 600,
            });
            return { token };
        }
        catch (error) {
            throw new Error("Login fallido: " + error.message);
        }
    }
}
exports.default = AuthService;
