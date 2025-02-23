import { RequestHandler } from "express";

/**
 * Controller base class.
 */
export type Controller<T extends string> = {
  [P in T]: RequestHandler;
};
