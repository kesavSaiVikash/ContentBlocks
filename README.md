### Setup Instructions :

1. Clone the repository :

- git clone https://github.com/kesavSaiVikash/ContentBlocks.git
- cd ContentBlocks

2. Install dependencies :

- npm install

3. Set up clerk :

### Note: By following the below steps i have setup my clerk account, but i will be providing my clerk ContentBlocks application's secret credentials in .env.local which can be used for testing the app without any exceptional account setup work by yourself (\* so basically jump this step and can jump to step-4).

- Sign up for a Clerk account at https://clerk.com/
- Create a new Clerk application and configure it according to your needs.
- Copy your Clerk API Key and Clerk Frontend API Key.
- Create a .env.local file in the root of your project and add your Clerk API keys:

4. Start development server :

- npm start

5. Open the app :

- Open http://localhost:3000 to view the app in your browser.

### Approach :

1. Authentication :

- Utilized the Clerk authentication service for handling user authentication.
- Integrated the Clerk frontend SDK to manage user sessions and authentication flows.

2. User Interface :

- Designed a responsive and intuitive user interface using React components and Tailwind CSS.

3. Data Management :

- Utilized Jotai for state management.

4. Modularization

- Organized the project into components, hooks, and utility functions for maintainability and reusability.
- Separated concerns between components, focusing on single responsibility principles.

5. Error Handling

- Implemented error handling for API requests and user inputs.
- Displayed error messages to users for feedback and troubleshooting.

6. Future Improvements

---

1. registration flow - Users can signup/ register using username, email and passoword. This can be done two ways:
    1) if magic link method then user will receive a magic link email which user can click on the link and login,
    2) if no magic link then its a traditional password reset flow 
2. login flow
3. forgot password flow
