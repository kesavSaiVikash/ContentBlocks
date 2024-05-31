# Setup Instructions :

**Clone the repository**:

- git clone https://github.com/kesavSaiVikash/ContentBlocks.git
- cd ContentBlocks

**Install dependencies** :

- npm install

**Set up clerk** :

- Sign up for a Clerk account at https://clerk.com/
- Create a new Clerk application and configure it according to your needs.
- Copy your Clerk API Key and Clerk Frontend API Key.
- Create a .env.local file in the root of your project and add your Clerk API keys:

**Start development server** :

- npm start

**Open the app** :

- Open http://localhost:3000 to view the app in your browser.

---

# ContentBlocks Login Component

## Features

1. **Login Interface:**

   - Username and password input fields.
   - Form validation for input format.
   - 'Forgot password' link.
   - Option to switch to the magic link method for sign in.

2. **Registration Interface:**

   - Username, email, and password input fields.
   - Password strength feedback.
   - Input validation for form errors.
   - Option to switch to the magic link method for sign out.

3. **State Management:**

   - Used Jotai for state management of authentication processes like session, username, email, error popups, loading, modal.
   - Used can take a look at the utils/store.js file to see the structure of all my states that are used in the app.
   - Used react-hoo-form's useForm for managing the form fields data abd validation.

4. **Security Features:**

   - Demonstrated password hashing process on useLogin page.

5. **Responsive Design:**
   - Used Responsive forms styled with Tailwind CSS to match the existing application's style.
