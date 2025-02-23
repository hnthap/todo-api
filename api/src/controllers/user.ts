import { UserModel } from "../database/user";
import { Controller } from "../interfaces/controller";
import { createAccessToken, hashPassword } from "../secure";
import { StatusCodes } from "../status-codes";
import { isValidEmail, isValidPassword, isValidUsername } from "../valid";

/**
 * Controller for user
 */
export const UserController: Controller<"login" | "register"> = {
  /**
   * Login as existing user by email and password.
   * Respond 400 BAD REQUEST if email or password is not provided.
   * Respond 401 UNAUTHORIZED if email or password is incorrect.
   * Respond 200 CREATED with an authorization token if success.
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  login: async (req, res, next) => {
    const { email, password } = req.body;
    if (!isValidEmail(email)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email must not be empty" });
      return;
    }
    if (!isValidPassword(password)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must not be empty" });
      return;
    }
    const user = await UserModel.selectByEmail({ email });
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Incorrect email" });
      return;
    }
    const { encryptedPassword } = user;
    if (hashPassword(password) !== encryptedPassword) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password" });
      return;
    }
    const token = await createAccessToken(user);
    res.status(StatusCodes.CREATED).json({ token });
  },

  /**
   * Register new user with specified "username", "email", "password"
   * in request body.
   * Respond 400 BAD REQUEST if name or email or password is not provided,
   * or is invalid.
   * Respond 201 CREATED if success.
   * Respond 500 INTERNAL SERVER ERROR if other errors occured.
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  register: async (req, res, next) => {
    const { name: username, email, password } = req.body;
    if (!isValidUsername(username)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Name must not be empty" });
      return;
    }
    if (!isValidEmail(email)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email must not be empty" });
      return;
    }
    if (!isValidPassword(password)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must not be empty" });
      return;
    }
    const success =
      (await UserModel.insert({
        encryptedPassword: hashPassword(password),
        username,
        email,
      })) === 1;
    if (success) {
      res
        .status(StatusCodes.CREATED)
        .json({ message: "registered successfully" });
      return;
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "failed to register new user" });
    }
  },
};