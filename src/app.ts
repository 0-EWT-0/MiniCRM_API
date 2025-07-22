import express, { Application } from "express";
import cors from "cors";
import { Request, Response } from "express";
import router from "./api/v1/routes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(
      cors({
        origin: "https://mini-crm-client-seven.vercel.app", // https://mini-crm-client-seven.vercel.app // aca va el puerto del front
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to the Mini CRM API!");
    });

    this.app.use("/api/v1", router);
  }
}

export default App;
