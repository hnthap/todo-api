import { User } from "./user";

/**
 * Todo class
 */
export interface Todo {
  todoId: number;
  title: string;
  description: string;
  createdTime: Date;
  updatedTime: Date;
  userId: User["userId"];
}