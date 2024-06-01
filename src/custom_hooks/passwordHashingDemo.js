// Import bcrypt for secure password hashing.
import bcrypt from "bcryptjs";

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {string} - The resulting hashed password.
 */

const hashPassword = (password) => {
  // Generate a salt with a cost factor of 10, enhancing security.
  const salt = bcrypt.genSaltSync(10);

  // Hash the password using the generated salt.
  return bcrypt.hashSync(password, salt);
};

// Example usage:
const plainPassword = "yourPassword123";
const hashedPassword = hashPassword(plainPassword);

// Output the hashed password for demonstration.
console.log("Hashed Password:", hashedPassword);
