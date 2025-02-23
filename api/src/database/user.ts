import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../interfaces/user";
import { connectMysql2 } from "./connect";

export const UserModel = {
  async selectByEmail(
    condition: Pick<User, "email">
  ): Promise<User | undefined> {
    return await connectMysql2(
      async (conn) => {
        const [results, fields] = await conn.query<RowDataPacket[]>(
          "SELECT user_id, username, created_time, updated_time, " +
            "encrypted_password " +
            "FROM todos.user WHERE email = ? " +
            "LIMIT 1",
          [condition.email]
        );
        if (results.length === 0) {
          return undefined;
        }
        const {
          user_id: userId,
          username,
          created_time: createdTime,
          updated_time: updatedTime,
          encrypted_password: encryptedPassword,
        } = results[0];
        if (
          typeof userId !== "number" ||
          typeof username !== "string" ||
          !(createdTime instanceof Date) ||
          !(updatedTime instanceof Date) ||
          typeof encryptedPassword !== "string"
        ) {
          throw new Error("Invalid property type in the table user");
        }
        return {
          email: condition.email,
          encryptedPassword,
          userId,
          createdTime,
          updatedTime,
          username,
        };
      },
      (error) => {
        console.error(
          "failed to select user by email, error: " + JSON.stringify(error)
        );
      }
    );
  },

  async insert(
    data: Pick<User, "username" | "email" | "encryptedPassword">
  ): Promise<number> {
    return (
      (await connectMysql2(
        async (conn) => {
          const [results, fields] = await conn.execute<ResultSetHeader>(
            "INSERT INTO todos.user " +
              "(username, email, encrypted_password) " +
              "VALUES (?, ?, ?)",
            [data.username, data.email, data.encryptedPassword]
          );
          return results.affectedRows;
        },
        (error) => {
          console.error(
            "failed to insert user, error: " + JSON.stringify(error)
          );
        }
      )) ?? 0
    );
  },
} as const;
