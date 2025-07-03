import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

class Config {
  public port: number;
  public nodeEnv: string;
  public dbUrl: string;
  public db: Pool;

  constructor() {
    this.port = Number(process.env.PORT || 3000);
    this.nodeEnv = String(process.env.NODE_ENV || "development");
    this.dbUrl = process.env.DATABASE_URL as string;

    this.db = new Pool({
      connectionString: this.dbUrl,
      ssl:
        process.env.DATABASE_SSL === "true"
          ? { rejectUnauthorized: false }
          : false,
    });
  }

  public async testDatabaseConnection(): Promise<void> {
    try {
      const result = await this.db.query("SELECT NOW()");
      console.log("✅ Conexión a PostgreSQL establecida:", result.rows[0].now);
    } catch (err: any) {
      console.error("❌ Error conectando a PostgreSQL:", err.message);
    }
  }
}

export default new Config();
