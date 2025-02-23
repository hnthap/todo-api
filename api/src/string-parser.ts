/**
 * Parse a string to boolean, when "T", "TRUE", "Y", "YES", "t", "true", "y",
 * "yes" or "1" would be the Boolean value of true.
 * @param s Value
 * @param defaultValue default value
 * @returns Boolean value
 */
export const parseBool = (
  s: string | undefined,
  defaultValue = false
): boolean => {
  if (s === undefined) {
    return defaultValue;
  }
  switch (s) {
    case "T":
    // fall through

    case "TRUE":
    // fall through

    case "Y":
    // fall through

    case "YES":
    // fall through

    case "t":
    // fall through

    case "true":
    // fall through

    case "y":
    // fall through

    case "yes":
    // fall through

    case "1":
      return true;

    default:
      return false;
  }
};
