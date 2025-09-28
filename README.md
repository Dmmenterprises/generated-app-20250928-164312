# Zenitho: The Minimalist To-Do List

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Dmmenterprises/generated-app-20250928-164312)

Zenitho is a hyper-minimalist to-do application designed to be the most visually satisfying and functionally elegant task manager ever created. It operates on a single, clean interface, eliminating all distractions. The core of the application is a single list view where users can add, manage, and complete tasks. The design philosophy is 'less is more,' focusing on beautiful typography, generous white space, and a serene color palette. The user experience is enhanced with fluid, subtle animations powered by Framer Motion for actions like adding, completing, and deleting tasks, making task management feel less like a chore and more like a delightful interaction. The application state is managed by Zustand and persists across sessions using browser localStorage, ensuring a seamless experience without a backend.

## Key Features

- **Minimalist Design**: A clean, single-view interface that helps you focus.
- **Fluid Animations**: Smooth, satisfying animations for all interactions, powered by Framer Motion.
- **State Persistence**: Your tasks are automatically saved to your browser's `localStorage` and are available across sessions.
- **Task Filtering**: Easily filter your tasks by 'All', 'Active', or 'Completed' status.
- **Responsive Perfection**: A flawless layout that looks and works great on any device, from mobile phones to desktops.
- **Light & Dark Modes**: A beautiful and comfortable viewing experience, day or night.
- **Keyboard Friendly**: Add new tasks by simply pressing 'Enter'.

## Technology Stack

- **Framework**: React (with Vite)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Type Checking**: TypeScript
- **Deployment**: Cloudflare Workers

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/zenitho.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd zenitho
    ```
3.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To start the local development server, run the following command:

```sh
bun run dev
```

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) to view it in your browser. The page will automatically reload if you make changes to the code.

## Deployment

This project is configured for easy deployment to Cloudflare Pages.

To deploy your application, simply run the build command followed by the deploy command:

```sh
bun run deploy
```

This command will build the application for production and deploy it using the Wrangler CLI.

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Dmmenterprises/generated-app-20250928-164312)