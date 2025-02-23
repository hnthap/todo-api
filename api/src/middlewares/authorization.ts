import express from "express";
import { User } from "../interfaces/user";
import { confirmToken } from "../secure";
import { StatusCodes } from "../status-codes";

/**
 * Authentication data
 * This is to be provided in req.body.auth after authorization.
 */
export type Auth = Pick<User, "userId" | "username" | "email">;

/**
 * Middleware to authorize request and respond 401 UNAUTHORIZED if unauthorized.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const authorize401: express.RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let decoded;
  try {
    decoded = await confirmToken(token);
  } catch (error) {
    console.error("Invalid token: " + JSON.stringify(error));
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
    return;
  }
  if (typeof decoded === "string") {
    decoded = JSON.parse(decoded);
  }
  const auth: Auth = {
    userId: decoded["userId"],
    username: decoded["username"],
    email: decoded["email"],
  };
  req.body.auth = auth;
  next();
};

/**
 * Middleware to authorize request and respond 403 FORBIDDEN if unauthorized.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const authorize403: express.RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let decoded;
  try {
    decoded = await confirmToken(token);
  } catch (error) {
    console.error("Invalid token: " + JSON.stringify(error));
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Forbidden" });
    return;
  }
  if (typeof decoded === "string") {
    decoded = JSON.parse(decoded);
  }
  const auth: Auth = {
    userId: decoded["userId"],
    username: decoded["username"],
    email: decoded["email"],
  };
  req.body.auth = auth;
  next();
};
