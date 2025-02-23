import express from "express";
import { TodoController } from "../controllers/todo";
import { authorize401, authorize403 } from "../middlewares/authorization";

/**
 * Express route for todos
 */
export const todosRoute = express.Router();

todosRoute.post("/", authorize401, TodoController.insertTodo);
todosRoute.put("/:id", authorize403, TodoController.updateTodo);
todosRoute.delete("/:id", authorize401, TodoController.deleteTodo);
todosRoute.get("/", authorize401, TodoController.selectTodo);
