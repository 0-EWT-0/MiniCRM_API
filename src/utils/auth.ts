import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

interface SessionData {
  [key: string]: any;
}

interface TokenDetails {
  sessionData: SessionData;
  maxAge: number; // Puede ser '1h', 3600, etc.
}

class Auth {
  private readonly secret: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido.");
    }
    this.secret = process.env.JWT_SECRET;
  }

  public generateToken(details: TokenDetails): string {
    if (!details?.sessionData || typeof details.sessionData !== "object") {
      throw new Error("Detalles inválidos para JWT");
    }

    const sanitizedData = Object.entries(details.sessionData).reduce(
      (acc, [key, val]) => {
        if (key !== "password" && typeof val !== "function") {
          acc[key] = val;
        }
        return acc;
      },
      {} as SessionData
    );

    const payload = { data: sanitizedData };

    const options: SignOptions = {
      expiresIn: details.maxAge,
      algorithm: "HS256",
    };

    return jwt.sign(payload, this.secret, options);
  }

  public verifyToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as JwtPayload);
      });
    });
  }
}

export default new Auth();
