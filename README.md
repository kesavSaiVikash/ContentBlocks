## ContentBlocks Auth App ReadMe:

**Setup Instructions:**

1. Clone the repository:

   - git clone https://github.com/kesavSaiVikash/ContentBlocks.git
   - cd ContentBlocks

2. Install dependencies:

   - npm install

3. Start development server:

   - npm start

4. Open the app:

   - Open http://localhost:3000 to view the app in your browser.

---

**Project Overview:**
This project is a React-based web application using Clerk for authentication. It includes various pages and components, state management with Jotai, and custom hooks to handle authentication flows. The application is styled using a combination of custom CSS and Tailwind CSS.

---

**Approach:**

1. Project Structure:

   - The project is organized into the following directories:

   - pages: Contains the main pages of the application (e.g., Login, Register, Home, ForgotPassword).
   - components: Reusable components used across different pages (e.g., Navbar, Loading, AuthLayout, ErrorMessage, ErrorPopup, FormInput, FormButton, ProtectedRoute).
   - custom_hooks: Custom hooks to encapsulate and manage logic for authentication and other features (e.g., useLogin, useRegister, useForgotPassword, useLogout, useErrorHandler).
   - utils: Utilities such as global state management using Jotai.
   - assets: Contains static assets like images and icons.

2. State Management:

   State management is handled using Jotai. The currentUserAtom is a global state that holds the current user's data and metadata. This atom is used across different components and custom hooks to ensure consistency and reactivity in state updates.

3. Authentication:

   Clerk is used for managing user authentication. The application supports various authentication strategies (email code, email link, password reset) configured through environment variables. Custom hooks (useLogin, useRegister, useForgotPassword, useLogout) encapsulate the logic for these authentication flows, ensuring a clean and maintainable approach.

4. Routing:

   React Router is used for client-side routing. The ProtectedRoute component ensures that routes requiring authentication are protected and redirect unauthenticated users to the login page.

5. Styling:

   Styling is achieved through a combination of Tailwind CSS and custom CSS. The custom CSS is wrapped around Tailwind classes for consistency and ease of use. Each component and page has its own scoped styles, ensuring modularity and maintainability.

---

**Project Files:**

1. Pages:

   - Login: The login page allowing users to authenticate.
   - Register: The registration page for new users.
   - Home: The main landing page for authenticated users.
   - ForgotPassword: The page for password recovery.

2. Components:

   - AuthLayout: Layout component used for authentication-related pages.
   - ErrorMessage: Component for displaying error messages dynamically.
   - ErrorPopup: Popup component for error notifications with close functionality.
   - FormInput: Form input component with error handling.
   - FormButton: Button component with loading state handling.
   - Loading: Component displaying a loading spinner and text.
   - Navbar: Navigation bar component with a logo and logout functionality.
   - Modal: Reusable modal dialog component.
   - ProtectedRoute: Higher-order component for protecting routes.

3. Custom Hooks:

   - useLogin: Manages login flow.
   - useRegister: Handles user registration and email verification.
   - useForgotPassword: Manages password reset requests and verification.
   - useLogout: Handles user logout.
   - useErrorHandler: Centralized error handling for async operations.

   **Note:**

   - passwordHashingDemo: A demonstration of how to do password hashing if we have a custom server and custom db where we can store the user auth data.
   - This file in custom_hooks/passwordHashingDemo.js is for password hashing demonstration purposes and have not been used anywhere in the project.

4. Configuration Files:

   - App.js: Main application component which returns all the app routes imported from src/routes.
   - index.js: Entry point rendering the app with the ClerkProvider.
   - .env.local: Local environment variables for configuring Clerk and authentication strategies.

5. Routes:

   - Component that holds all the routes including protected and public routes, this component is imported on App.js
   - This component is basically for configuring routes and wrapping them in necessary providers.

---

**Conclusion:**

This project demonstrates a modular and scalable approach to building a React application with user authentication.
By leveraging Clerk for authentication, Jotai for state management, and React Router for navigation, the application is well-structured and easy to maintain. The use of custom hooks encapsulates business logic, promoting reusability and separation of concerns.

---

**Future Upgrades**

1. **Adding Social Logins with Clerk API:**
   Integrating social login functionality using Clerk API can improve user convenience and accessibility. Users can choose to log in with their existing social media accounts, such as Google, Facebook, Twitter and etc providing a seamless authentication experience.

2. **Developing a Content Blocks Admin Portal:**
   Creating a custom admin portal leveraging Clerk's admin functionality can provide a centralized interface for managing users, permissions, and other administrative tasks related to the application. This portal is similar to Clerk's dashboard while customizing it to suit the specific needs of ContentBlocks.

3. **Implementing Custom Node.js Server for Authentication:**
   Setting up a custom Node.js server to handle authentication on the server-side using Clerk's Node.js API offers several advantages. It allows for additional security measures such as password hashing, token validation, and rate limiting. Most important is offloading authentication tasks from the client-side to the server-side can improve performance and scalability.

4. **Utilizing Custom Database for User Storage:**
   Leveraging a custom database to store user data while Clerk handles authentication can provide flexibility and control over data management. This approach allows for seamless integration with existing systems, enables customized data schemas, and provides data migration or backups as required.

---

**Thanks for reading me!**
