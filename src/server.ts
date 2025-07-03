import config from "./config/environment";
import App from "./app";

const startServer = async () => {
  try {
    await config.testDatabaseConnection();
    const app = new App();

    app.app.listen(config.port, () => {
      console.log(
        `🚀 Servidor corriendo en puerto ${config.port} en modo ${config.nodeEnv}`
      );
    });
  } catch (error) {
    console.error("❌ No se pudo iniciar el servidor:", error);
  }
};

startServer();
