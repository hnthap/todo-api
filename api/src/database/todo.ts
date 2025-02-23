import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Todo } from "../interfaces/todo";
import { connectMysql2 } from "./connect";

export type ShortTodo = {
  id: Todo["todoId"];
  title: Todo["title"];
  description: Todo["description"];
};

/**
 * Data model for todos
 */
export const TodoModel = {
  /**
   * Asynchronously insert todo.
   * @param data Inserted data
   * @returns Inserted data if exists, otherwise undefined
   */
  async insert(
    data: Pick<Todo, "title" | "description" | "userId">
  ): Promise<ShortTodo | undefined> {
    const [insertId, affectedRows] = (await connectMysql2(
      async (conn) => {
        const [results, fields] = await conn.execute<ResultSetHeader>(
          "INSERT INTO todos.todo (title, description, user_id) " +
            "VALUES (?, ?, ?)",
          [data.title, data.description, data.userId]
        );
        return [results.insertId, results.affectedRows];
      },
      (error) => {
        console.error("failed to insert todo, error: " + JSON.stringify(error));
      }
    )) ?? [0, 0];
    if (affectedRows === 0) {
      return undefined;
    }
    return await this.selectById(insertId);
  },

  /**
   * Asynchronously select todos.
   * @param userId User ID
   * @param page Page number starting from 1
   * @param limit Number of todos in one page
   * @returns Array of todos
   */
  async select(
    userId: Todo["userId"],
    page: number,
    limit: number
  ): Promise<ShortTodo[]> {
    if (userId === undefined || typeof userId !== "number") {
      // TODO: use something like typeof userId !== Todo["userId"]
      console.error("userId value is invalid: " + JSON.stringify(userId));
      return [];
    }
    if (page <= 0 || !Number.isSafeInteger(page)) {
      console.error("page must be a 'safe' integer greater than 0");
      return [];
    }
    if (limit <= 0 || !Number.isSafeInteger(limit)) {
      console.error("limit must be a 'safe' integer greater than 0");
      return [];
    }
    return (
      (await connectMysql2(
        async (conn) => {
          const [results, fields] = await conn.query<RowDataPacket[]>(
            "SELECT todo_id, title, description, created_time, updated_time " +
              "FROM todos.todo " +
              "WHERE user_id = ? " +
              "ORDER BY created_time ASC LIMIT ?,?",
            [userId, (page - 1) * limit, limit]
          );
          return results.map<ShortTodo>((row) => ({
            id: row.todo_id,
            title: row.title,
            description: row.description,
          }));
        },
        (error) => {
          console.error(
            "failed to select todos, error: " + JSON.stringify(error)
          );
        }
      )) ?? []
    );
  },

  /**
   * Asynchronously select todo by its ID.
   * @param todoId Todo ID
   * @returns Todo if found, otherwise undefined.
   */
  async selectById(todoId: Todo["todoId"]): Promise<ShortTodo | undefined> {
    return await connectMysql2(
      async (conn) => {
        const [results, fields] = await conn.query<RowDataPacket[]>(
          "SELECT title, description, created_time, updated_time, user_id " +
            "FROM todos.todo WHERE todo_id = ? LIMIT 1",
          [todoId]
        );
        if (results.length === 0) {
          return undefined;
        }
        const {
          created_time: createdTime,
          updated_time: updatedTime,
          title,
          description,
        } = results[0];
        if (
          typeof title !== "string" ||
          typeof description !== "string" ||
          !(createdTime instanceof Date) ||
          !(updatedTime instanceof Date)
        ) {
          throw new Error("Invalid property type in the table todo");
        }
        return { id: todoId, title, description };
      },
      (error) => {
        console.error(
          "failed to select todo by id, error: " + JSON.stringify(error)
        );
      }
    );
  },

  /**
   * Asynchronously update todo specified by ID.
   * @param data Updated data
   * @returns Updated todo
   */
  async update(
    data: Pick<Todo, "todoId" | "title" | "description">
  ): Promise<ShortTodo | undefined> {
    await connectMysql2(
      async (conn) => {
        await conn.execute<ResultSetHeader>(
          "UPDATE todos.todo SET title = ?, description = ? WHERE todo_id = ?",
          [data.title, data.description, data.todoId]
        );
      },
      (error) => {
        console.error("failed to update todo, error: " + JSON.stringify(error));
      }
    );
    return await this.selectById(data.todoId);
  },

  /**
   * Asynchronously delete todo by ID.
   * @param todoId Todo ID
   * @returns whether the operation is success
   */
  async delete(todoId: Todo["todoId"]): Promise<boolean> {
    return (
      (await connectMysql2(
        async (conn) => {
          const [results, fields] = await conn.execute<ResultSetHeader>(
            "DELETE FROM todos.todo WHERE todo_id = ?",
            [todoId]
          );
          return results.affectedRows !== 0;
        },
        (error) => {
          console.error(
            "failed to update todo, error: " + JSON.stringify(error)
          );
        }
      )) ?? false
    );
  },
} as const;
