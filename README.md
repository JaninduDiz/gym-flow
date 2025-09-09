# GymFlow - Gym Management System

GymFlow is a comprehensive, modern web application designed to streamline the management of a gym or fitness center. It provides administrators and staff with the tools they need to handle members, track payments, manage membership plans, and control user access to the system. The application is built with a focus on a clean, responsive user interface and leverages AI for intelligent features like CSV data importing.

## ✨ Features

- **Dashboard:** An at-a-glance overview of key metrics, including total members, overdue payments, and recent revenue.
- **Member Management:** Add, view, edit, and search for members. A detailed view shows member information, status, and payment history.
- **Payment Tracking:** Log and monitor payments with statuses like 'Paid', 'Due', and 'Overdue'.
- **Plan Management:** Create, update, and delete membership plans with custom pricing, billing cycles, and features.
- **User Administration:** Manage application users (admins, managers, staff) with role-based access control.
- **AI-Powered CSV Import:** Easily import member data from a CSV file with an AI-powered column mapping feature.
- **Responsive Design:** A mobile-first design ensures the application is fully functional on any device.
- **Light & Dark Modes:** A theme toggler in the settings page to switch between light and dark modes.
- **PWA Ready:** The application is configured as a Progressive Web App (PWA), allowing it to be installed on user devices.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI
- **Authentication:** Firebase Authentication
- **AI Integration:** Google's Genkit
- **Forms:** React Hook Form with Zod for validation
- **Deployment:** Firebase App Hosting

## 🛠️ Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) or another package manager like [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- A Firebase project with Authentication enabled.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/gymflow.git
    cd gymflow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add your Firebase project configuration keys. You can find these in your Firebase project settings.

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    GEMINI_API_KEY=your_gemini_api_key
    ```
    You will also need a Gemini API key for the AI features to work.

### Running the Application

To run the development server, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## 📦 Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Creates a production-ready build of the application.
- `npm run start`: Starts the application in production mode (requires a build first).
- `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
- `npm run genkit:dev`: Starts the Genkit development server for AI flows.
