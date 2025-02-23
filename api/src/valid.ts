/**
 * Check if username is valid.
 * @todo TODO: improve the rule
 * @param username username
 * @returns whether username is valid
 */
export const isValidUsername = (username: any): boolean => {
  // TODO: validate name, e.g. detect profanity
  if (typeof username !== "string" || username.length === 0) {
    return false;
  }
  return true;
}

/**
 * Check if email is valid.
 * @param email email
 * @returns whether email is valid
 */
export const isValidEmail = (email: any): boolean => {
  // TODO: validate email syntax
  if (typeof email !== "string" || email.length === 0) {
    return false;
  }
  return true;
};

/**
 * Check if password is valid.
 * @param password password
 * @returns whether password is valid
 */
export const isValidPassword = (password: any): boolean => {
  // TODO: validate password, e.g. length, character range
  if (typeof password !== "string" || password.length === 0) {
    return false;
  }
  return true;
}
