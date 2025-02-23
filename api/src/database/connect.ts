import mysql from "mysql2/promise";

/**
 * Asynchronously connect to database and execute statement or query data.
 * @param callback Asynchronously handle connection to execute/query and 
 * return the desired data.
 * @param onError Handle errors if there is any
 * @returns The promise containing the desired data
 */
export const connectMysql2 = async <T> (
  callback: (connection: mysql.Connection) => Promise<T>,
  onError: (error: unknown) => void = (error) => {
    throw error;
  }
): Promise<T | undefined> => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    return await callback(connection);
  } catch (error) {
    onError(error);
    return undefined;
  }
};