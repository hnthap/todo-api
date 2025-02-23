import express from "express";

/**
 * Middleware to log in the shell
 * @todo TODO: log to file
 * @param req 
 * @param res 
 * @param next 
 */
export const logMiddleware: express.RequestHandler = async (req, res, next) => {
  const now = new Date();
  const nowIso = now.toISOString();
  const requestMethod = req.method;
  const requestPath = req.path;
  const requestIp = req.ip ?? "unknown ip";
  const logString =
    nowIso + " " + requestMethod + " " + requestPath + " " + requestIp;
  console.log(logString);
  next();
};
