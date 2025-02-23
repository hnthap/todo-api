import express from "express";
import { UserController } from "../controllers/user";

/**
 * Express route for register
 */
export const registerRoute = express.Router();

registerRoute.post("/", UserController.register);
