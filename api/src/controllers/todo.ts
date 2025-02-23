import { RequestHandler } from "express";
import { TodoModel } from "../database/todo";
import { StatusCodes } from "../status-codes";

/**
 * Controller for todos
 */
export const TodoController: {
  /**
   * Insert new todo with "title" and "description" in request body.
   * Respond 201 CREATED with created todo if success, otherwise 500.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  insert: RequestHandler;

  /**
   * Update todo with "id" as parameter and "title" and "description"
   * in request body.
   * Respond 404 NOT FOUND if "id" is invalid, i.e. not a number or
   * not existing id.
   * Respond 400 BAD REQUEST if "title" or "description" is missing.
   * Respond 200 OK with updated todo if success.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  update: RequestHandler;

  /**
   * Delete todo with specified id provided as paramter.
   * Respond 404 NOT FOUND if "id" if invalid.
   * Response 204 NO CONTENT if success.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  delete: RequestHandler;

  /**
   * Select todos by
   * - page number ("page"). default: 1
   * - number of todos per page ("limit"). default: 5
   * - `WORKING IN PROGRESS` substring search ("subs"). default: not specified
   * - `WORKING IN PROGRESS` property to sort by ("ob", stands for "order by"), must be one of
   *   "title", "created_time", "updated_time". default: "created_time"
   * - `WORKING IN PROGRESS` sorting order ("od", stands for "order direction"), must be one of "a"
   *   (ascending) or "d" (descending). default: "d"
   *
   * Respond 200 OK with list of todos found.
   *
   * @param req
   * @param res
   * @param next
   */
  select: RequestHandler;
} = {
  insert: async (req, res, next) => {
    const { title, description } = req.body;
    if (
      typeof title !== "string" ||
      title.length === 0 ||
      typeof description !== "string" ||
      description.length === 0
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "title or description is missing" });
      return;
    }
    const todo = await TodoModel.insert({
      userId: req.body.auth.userId,
      title,
      description,
    });
    if (todo) {
      res.status(StatusCodes.CREATED).json(todo);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "failed to create new todo" });
    }
  },

  update: async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Invalid todo ID: " + req.params.id });
      return;
    }
    const { title, description } = req.body;
    if (
      typeof title !== "string" ||
      title.length === 0 ||
      typeof description !== "string" ||
      description.length === 0
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "title or description is missing" });
      return;
    }
    const todo = await TodoModel.update({ todoId: id, title, description });
    if (todo) {
      res.status(StatusCodes.OK).json({ todo });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "no todo with ID " + id });
    }
  },

  delete: async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Invalid todo ID: " + req.params.id });
      return;
    }
    const success = await TodoModel.delete(id);
    if (success) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "Successfully delete todo" });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "no todo with ID " + id + ", or there is an error in our side",
      });
    }
  },

  select: async (req, res, next) => {
    let page = Number(req.query.page);
    page = Number.isNaN(page) ? 1 : page;
    let limit = Number(req.query.limit);
    limit = Number.isNaN(limit) ? 5 : limit;

    const todos = await TodoModel.select(req.body.auth.userId, page, limit);
    res
      .status(StatusCodes.OK)
      .json({ data: todos, page, limit, total: todos.length });
  },
} as const;
