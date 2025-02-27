import express from "express";
import { TodoController } from "../controllers/todo";
import { authorize401, authorize403 } from "../middlewares/authorization";

/**
 * Express route for todos
 */
export const todosRoute = express.Router();

todosRoute.post("/", authorize401, TodoController.insert);
todosRoute.put("/:id", authorize403, TodoController.update);
todosRoute.delete("/:id", authorize401, TodoController.delete);
todosRoute.get("/", authorize401, TodoController.select);
