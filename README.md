---

# Website Blog

## Description

Website Blog is a web application developed using the Next.js framework, Chakra UI for styling, and Redux Toolkit for state management. It allows users to create, edit, and view blog posts. The application provides a user-friendly interface with features like pagination and responsive design.

## Features

- **Create Blog Posts:** Users can create new blog posts with a title and content.
- **Edit Blog Posts:** Existing blog posts can be edited to update the title and content.
- **View Blog Posts:** Users can view their own blog posts as well as posts from other users.
- **Pagination:** Blog posts are paginated to improve navigation and user experience.
- **Responsive Design:** The application is designed to work seamlessly across various screen sizes and devices.
- **Authentication (Login and Register):** Users can create an account to access the application. They can log in securely to manage their blog posts.

## Tools Used

- **Next.js:** A React framework for building server-side rendered and statically generated web applications.
- **Chakra UI:** A simple, modular, and accessible component library for React applications.
- **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development.
- **Axios:** A promise-based HTTP client for making API requests.
- **Formik:** A form library for React that helps with form handling and validation.
- **Yup:** A schema-based validation library for JavaScript.
- **js-cookie:** A JavaScript API for handling browser cookies.
- **UUID:** A library for generating unique identifiers.
- **Framer Motion:** A library for creating smooth animations in React applications.

## Getting Started

### Running the Application

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd website-blog
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser and go to:**

   ```plaintext
   http://localhost:3000
   ```

By following these steps, you should be able to set up and run the application locally on your machine.

## Folder Structure

The project follows a structured folder layout to keep the code organized:

```
src
├───api
├───app
│   ├───auth
│   │   ├───sign-in
│   │   └───sign-up
│   └───detail
│       └───[id]
├───components
│   ├───common
│   ├───layout
│   └───ui
├───hooks
├───lib
│   └───features
├───types
└───utils
```

The `src` directory contains all the main code for the application, divided into logical subdirectories:
- `api` for API-related code.
- `app` for the main application pages and routes.
- `components` for reusable UI components.
- `hooks` for custom React hooks.
- `lib` for library-specific code, such as Redux features.
- `types` for TypeScript type definitions.
- `utils` for utility functions and helpers.

## Additional Scripts

The project includes several npm scripts for common tasks:

- **Start the development server:**

  ```bash
  npm run dev
  ```

- **Build the application for production:**

  ```bash
  npm run build
  ```

- **Start the production server:**

  ```bash
  npm run start
  ```

- **Lint the code:**

  ```bash
  npm run lint
  ```

By following this README, you should have all the information needed to set up, run, and understand the structure of the Website Blog project.

---
