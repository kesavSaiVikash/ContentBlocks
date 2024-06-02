import { compare, genSalt, hash } from "bcryptjs";

// Simulated database
const database = {
  users: [],
};

// Simulated backend APIs
const backendAPI = {
  register: async (username, email, plaintextPassword) => {
    // Simulating registration API call to the backend
    console.log(`Registering user ${username} with email ${email}`);

    // Hashing the password on the backend
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(plaintextPassword, salt);

    database.users.push({ username, email, hashedPassword }); // Simulating saving user to the database

    console.log(
      `Registered user ${username} with email ${email} and hash key ${hashedPassword}`
    );
    return true; // Simulating successful registration
  },

  login: async (email, password) => {
    // Simulating login API call to the backend
    console.log(`User with email ${email} attempting to log in...`);

    const user = database.users.find((user) => user.email === email);

    if (user) {
      const isPasswordCorrect = await compare(password, user.hashedPassword);
      if (isPasswordCorrect) {
        console.log(`User with email ${email} logged in successfully.`);
        return true;
      } else {
        console.log(`Login failed. Incorrect email or password.`);
        return false;
      }
    } else {
      console.log(`Login failed. User with email ${email} not found.`);
      return false;
    }
  },
};

// Frontend simulation function of user registration
const registerUser = async (username, email, password) => {
  try {
    const success = await backendAPI.register(username, email, password); // Call to simulated backend register api
    if (success) {
      console.log(
        `User ${username} with email ${email} registered successfully.`
      );
    } else {
      console.log(`Registration failed.`);
    }
  } catch (error) {
    console.error(`Error during registration: ${error.message}`);
  }
};

// Frontend simulation function of user login
const loginUser = async (email, password) => {
  try {
    const success = await backendAPI.login(email, password); // Call to simulated backend login api
    if (success) {
      console.log(`User with email ${email} logged in successfully.`);
    } else {
      console.log(`Login failed.`);
    }
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
  }
};

// Example usage
(async () => {
  // Simulated frontend registration call
  await registerUser("Kesav_Bollam", "test@test.com", "password123");

  // Simulated frontend login call
  await loginUser("test@test.com", "password123");
})();
