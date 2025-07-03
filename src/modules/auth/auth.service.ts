import bcrypt from "bcrypt";
import auth from "../../utils/auth";
import { Pool } from "pg";

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

  public async Register(user: RegisterUser): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (user.is_accepted === true) {
      const query = `
        INSERT INTO users_crm (name, email, password)
        VALUES ($1, $2, $3)
        `;

      const values = [user.name, user.email, hashedPassword];

      await this.db.query(query, values);

      return { message: "Usuario registrado correctamente" };
    } else if (user.is_accepted === false) {
      return { message: "Terminos no aceptados" };
    } else {
      throw new Error("Error al registrar el usuario");
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
