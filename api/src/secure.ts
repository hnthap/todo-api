import { hash } from "crypto";
import jwt from "jsonwebtoken";
import { User } from "./interfaces/user";

/**
 * Asynchronously create access token.
 * @param param0 Login information to create token
 * @returns token
 */
export const createAccessToken = (
  { userId, username, email }: Pick<User, "userId" | "username" | "email">
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId, username, email },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1H" },
      (error, encoded) => {
        if (error) {
          reject(error);
        } else if (!encoded) {
          reject("jwt.sign() failed (encoded to undefined)");
        } else {
          resolve(encoded);
        }
      }
    );
  }); 
};

/**
 * Asynchronously confirm the validity of an access token.
 * @param token token
 * @returns decoded login data if token is valid, otherwise rejecting
 */
export const confirmToken = (
  token: string | undefined
): Promise<string | jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET!, (error, decoded) => {
        if (error) {
          reject(error);
        } else if (!decoded) {
          reject("jwt.verify failed (decoded to undefined)");
        } else {
          resolve(decoded);
        }
      });
    } else {
      reject("token is undefined");
    }
  });
};

/**
 * Hash a password.
 * @param password password
 * @returns Hashed password
 */
export const hashPassword = (password: string): string => {
  return hash(
    "sha512",
    ("waaowiOIOUEHOUEWH983829" +
      password.slice(0, Math.round(password.length / 2)) +
      "whuiawehaiwuehr" +
      password.slice(Math.round(password.length / 3)) +
      "{}{}{WEO#@}|#@|#@#@$$^%&^*").repeat(10)
  );
}
