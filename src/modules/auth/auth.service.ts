import bcrypt from "bcrypt";
import auth from "../../utils/auth";
import { Pool } from "pg";
import axios from "axios";

interface LoginUser {
  email: string;
  password: string;
}

interface RegisterUser {
  name: string;
  email: string;
  password: string;
  is_accepted: boolean;
}

class AuthService {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async Register(
    user: RegisterUser & { recaptchaToken: string }
  ): Promise<{ message: string }> {
    const { recaptchaToken, ...userData } = user;

    // Validar reCAPTCHA con Google
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: recaptchaToken,
      })
    );

    if (!data.success || data.score < 0.5) {
      throw new Error("Fallo la verificación de reCAPTCHA");
    }

    // Continuar con el registro
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    if (userData.is_accepted) {
      const query = `
      INSERT INTO users_crm (name, email, password)
      VALUES ($1, $2, $3)
    `;
      const values = [userData.name, userData.email, hashedPassword];
      await this.db.query(query, values);
      return { message: "Usuario registrado correctamente" };
    } else {
      return { message: "Términos no aceptados" };
    }
  }

  public async Login(user: LoginUser): Promise<{ token: string }> {
    try {
      const query = `
      SELECT user_id, name, email, password
      FROM users_crm
      WHERE email = $1
    `;

      const result = await this.db.query(query, [user.email]);

      const dbUser = result.rows[0];

      if (!dbUser) throw new Error("Usuario no encontrado");

      const isValid = await bcrypt.compare(user.password, dbUser.password);
      if (!isValid) throw new Error("Contraseña incorrecta");

      const token = auth.generateToken({
        sessionData: {
          id: dbUser.user_id,
          name: dbUser.name,
          email: dbUser.email,
        },
        maxAge: 600 * 600,
      });

      return { token };
    } catch (error: any) {
      throw new Error("Login fallido: " + error.message);
    }
  }
}

export default AuthService;
