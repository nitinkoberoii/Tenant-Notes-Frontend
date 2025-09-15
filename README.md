# Multi-Tenant SaaS Notes Application - Frontend

This is the frontend for the multi-tenant SaaS Notes application, built with React. It provides a clean, responsive, and intuitive user interface for users to manage their notes securely within their tenant's workspace.

This application is designed to work with its corresponding [backend API](link-to-your-backend-repo).

## ✨ Key Features

- **Secure User Login**: JWT-based authentication to securely log in users.
- **Role-Based Interface**: The UI adapts based on user roles (Admin vs. Member), showing or hiding specific controls like subscription management.
- **Multi-Tenant Dashboard**: Once logged in, users have access to a dashboard that is strictly isolated to their tenant's data.
- **Full Note Management (CRUD)**: A complete interface for creating, reading, updating, and deleting notes.
- **Subscription Awareness**: Intelligently detects when a user on a "Free" plan has reached their note limit and prompts them to upgrade.
- **Responsive Design**: A seamless user experience on both desktop and mobile devices.

## 🛠️ Tech Stack

- **Core Framework**: [React.js](https://reactjs.org/)
- **API Communication**: [Axios](https://axios-http.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`)

---

## 🚀 Getting Started

Follow these instructions to set up and run the frontend on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/)
- A running instance of the [backend server](link-to-your-backend-repo).

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nitinkoberoii/Tenant-Notes-Frontend.git
    cd <repository-folder>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the root of the project. This file will tell your frontend where to find the backend API.

    _If you are using **Create React App**, the variable must start with `REACT_APP_`.\_

    ```env
    REACT_APP_API_BASE_URL="http://localhost:3001/api"
    ```

    _If you are using **Vite**, the variable must start with `VITE_`.\_

    ```env
    VITE_API_BASE_URL="http://localhost:3001/api"
    ```

4.  **Run the development server:**
    ```bash
    npm start
    ```
    (or `npm run dev` depending on your project setup)

The application will now be running on `http://localhost:3000` (or another port specified in your terminal).

## 🔗 Connecting to the Backend

This project uses a centralized Axios client for all API communication, located at `src/api/axios.js`.

The `baseURL` for this client is automatically configured using the environment variable you set in the `.env` file. This makes it easy to switch between local development and a live production API without changing code in multiple components.

## 📜 Available Scripts

In the project directory, you can run:

- `npm start` or `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production into the `build` (or `dist`) folder.
- `npm test`: Launches the test runner in interactive watch mode.
