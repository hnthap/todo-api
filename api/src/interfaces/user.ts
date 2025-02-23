/**
 * User class
 */
export interface User {
  userId: number;
  username: string;
  email: string;
  encryptedPassword: string;
  createdTime: Date;
  updatedTime: Date;
}