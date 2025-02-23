import express from "express";
import { logMiddleware } from "./middlewares/log";
import { loginRoute } from "./routes/login";
import { registerRoute } from "./routes/register";
import { todosRoute } from "./routes/todos";

/**
 * Main function.
 */
const main = async () => {
  const port = 8000;
  const app = express();

  app.use(express.json());
  app.use(logMiddleware);
  app.use("/register", registerRoute);
  app.use("/login", loginRoute);
  app.use("/todos", todosRoute);

  app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to To-Do Server v0.1.0!" });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

main().catch((error) => console.error(error));
