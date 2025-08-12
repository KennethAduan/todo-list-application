# Todo List Application

A modern, feature-rich todo list application built with React, TypeScript, and Vite. This application demonstrates best practices in React development with a clean architecture, comprehensive testing, and modern UI components.

## Features

### Core Functionality

- **Create Todos**: Add simple todos with just a title or detailed todos with descriptions
- **Edit Todos**: Modify existing todo titles and descriptions
- **Toggle Completion**: Mark todos as complete or incomplete
- **Delete Todos**: Remove todos with confirmation dialogs
- **Persistent Storage**: Todos are automatically saved to localStorage

### User Interface

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI Components**: Built with Tailwind CSS and custom component library
- **Interactive Dialogs**: Edit and delete confirmation modals
- **Form Validation**: Real-time validation using Zod schemas
- **Toast Notifications**: User feedback for actions (planned)

### Technical Features

- **Type Safety**: Full TypeScript implementation with Zod schema validation
- **State Management**: Zustand for efficient state management
- **Routing**: TanStack Router for client-side navigation
- **Testing**: Comprehensive test suite with Vitest and Testing Library
- **Code Quality**: ESLint configuration with TypeScript support

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Routing**: TanStack Router
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Vitest, Testing Library
- **Build Tool**: Vite
- **Package Manager**: Bun

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Bun](https://bun.sh/) (recommended) or npm/yarn
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KennethAduan/todo-list-application.git
cd todo-list-application
```

### 2. Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Start Development Server

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
# Using Bun
bun run build

# Or using npm
npm run build

# Or using yarn
yarn build
```

## Testing

### Run Tests

```bash
# Run tests in watch mode
bun run test

# Run tests once
bun run test:run

# Run tests with UI
bun run test:ui
```

### Test Coverage

The project includes comprehensive testing for:

- Component rendering and interactions
- State management logic
- Schema validation
- User interactions and form submissions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── dialog.tsx
│   ├── input-field.tsx
│   ├── label.tsx
│   ├── navbar.tsx
│   ├── table.tsx
│   └── toast.tsx
├── constants/           # Application constants
│   └── app.routes.ts
├── hooks/              # Custom React hooks
│   ├── use-toast.ts
│   └── useTodos.ts
├── pages/              # Page components
│   ├── home/           # Home page with simple todo form
│   └── improve-ui/     # Enhanced UI with full CRUD operations
├── routes/             # TanStack Router configuration
├── schema/             # Zod validation schemas
├── store/              # Zustand state management
├── utils/              # Utility functions
└── main.tsx            # Application entry point
```

## Available Routes

- **Home** (`/`): Simple todo creation interface
- **Todo List** (`/todo-list`): Basic todo list view
- **Improved UI** (`/improved-ui`): Full-featured todo management with CRUD operations

## Development

### Code Quality

```bash
# Run ESLint
bun run lint

# Fix ESLint issues automatically
bun run lint --fix
```

### Type Checking

```bash
# Check TypeScript types
bun run build
```

### Build and Preview

```bash
# Build the application
bun run build

# Preview the built application
bun run preview
```
---

