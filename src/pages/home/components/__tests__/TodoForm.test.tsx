import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { TodoForm } from "../todo-form";
import { ToastProvider } from "@/components/toast";

// Mock the useTodos hook
const mockCreateTodo = vi.fn();
const mockCreateTodoWithDescription = vi.fn();

vi.mock("../../../hooks/useTodos", () => ({
  useTodos: () => ({
    createTodo: mockCreateTodo,
    createTodoWithDescription: mockCreateTodoWithDescription,
  }),
}));

// Mock the components to simplify testing
vi.mock("../todo-item", () => ({
  TodoItem: ({
    index,
    isOnlyItem,
    error,
    onAdd,
    onDelete,
  }: {
    index: number;
    isOnlyItem: boolean;
    error?: string;
    onAdd: () => void;
    onDelete: (index: number) => void;
  }) => (
    <div data-testid={`todo-item-${index}`}>
      <input
        data-testid={`todo-title-${index}`}
        placeholder="Task Name"
        defaultValue=""
      />
      {error && <span data-testid={`todo-error-${index}`}>{error}</span>}
      {isOnlyItem ? (
        <button
          data-testid={`todo-add-${index}`}
          onClick={() => onAdd()}
          type="button"
        >
          Add
        </button>
      ) : (
        <button
          data-testid={`todo-delete-${index}`}
          onClick={() => onDelete(index)}
          type="button"
        >
          Delete
        </button>
      )}
    </div>
  ),
}));

vi.mock("../todo-item-with-description", () => ({
  TodoItemWithDescription: ({
    index,
    isOnlyItem,
    titleError,
    descriptionError,
    onAdd,
    onDelete,
  }: {
    index: number;
    isOnlyItem: boolean;
    titleError?: string;
    descriptionError?: string;
    onAdd: () => void;
    onDelete: (index: number) => void;
  }) => (
    <div data-testid={`todo-with-desc-${index}`}>
      <input
        data-testid={`todo-with-desc-title-${index}`}
        placeholder="Task Name"
        defaultValue=""
      />
      <input
        data-testid={`todo-with-desc-description-${index}`}
        placeholder="Description"
        defaultValue=""
      />
      {titleError && (
        <span data-testid={`todo-with-desc-title-error-${index}`}>
          {titleError}
        </span>
      )}
      {descriptionError && (
        <span data-testid={`todo-with-desc-description-error-${index}`}>
          {descriptionError}
        </span>
      )}
      {isOnlyItem ? (
        <button
          data-testid={`todo-with-desc-add-${index}`}
          onClick={() => onAdd()}
          type="button"
        >
          Add
        </button>
      ) : (
        <button
          data-testid={`todo-with-desc-delete-${index}`}
          onClick={() => onDelete(index)}
          type="button"
        >
          Delete
        </button>
      )}
    </div>
  ),
}));

vi.mock("../todo-list", () => ({
  TodoList: ({
    children,
    onAdd,
    addButtonText,
  }: {
    children: React.ReactNode;
    onAdd: () => void;
    addButtonText: string;
  }) => (
    <div data-testid="todo-list">
      {children}
      <button
        data-testid={
          addButtonText === "Add TODO LIST"
            ? "add-todo-button"
            : "add-todo-with-desc-button"
        }
        onClick={onAdd}
        type="button"
      >
        {addButtonText}
      </button>
    </div>
  ),
}));

vi.mock("../todo-section", () => ({
  TodoSection: ({
    children,
    title,
    error,
  }: {
    children: React.ReactNode;
    title: string;
    error?: string;
  }) => (
    <div data-testid="todo-section">
      <h2>{title}</h2>
      {error && <span data-testid="section-error">{error}</span>}
      {children}
    </div>
  ),
}));

vi.mock("@/components", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <button data-testid="submit-button" {...props}>
      {children}
    </button>
  ),
}));

// Helper function to render TodoForm with ToastProvider
const renderTodoForm = () => {
  return render(
    <ToastProvider>
      <TodoForm />
    </ToastProvider>
  );
};

describe("TodoForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form with correct title", () => {
    renderTodoForm();

    expect(screen.getByText("Add FORM")).toBeInTheDocument();
  });

  it("should render both todo sections", () => {
    renderTodoForm();

    expect(screen.getByText("TODO LIST")).toBeInTheDocument();
    expect(screen.getByText("TODO LIST with Description")).toBeInTheDocument();
  });

  it("should render initial todo items", () => {
    renderTodoForm();

    expect(screen.getByTestId("todo-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("todo-with-desc-0")).toBeInTheDocument();
  });

  it("should render add buttons for both sections", () => {
    renderTodoForm();

    expect(screen.getByTestId("add-todo-button")).toBeInTheDocument();
    expect(screen.getByTestId("add-todo-with-desc-button")).toBeInTheDocument();
  });

  it("should render submit button", () => {
    renderTodoForm();

    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toHaveTextContent("ADD FORM");
  });

  it("should render form structure correctly", () => {
    renderTodoForm();

    // Check if form elements are present
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getAllByTestId("todo-section")).toHaveLength(2);
    expect(screen.getAllByTestId("todo-list")).toHaveLength(2);
  });
});
