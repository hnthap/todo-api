import express from "express";
import { UserController } from "../controllers/user";

/**
 * Express route for login
 */
export const loginRoute = express.Router();

loginRoute.post("/", UserController.login);
