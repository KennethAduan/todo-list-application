import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

// Mock the TodoForm component to avoid complex dependencies
vi.mock("../components/todo-form", () => ({
  TodoForm: () => <div data-testid="todo-form">Todo Form Component</div>,
}));

describe("HomePage", () => {
  it("should render the home page with correct layout", () => {
    render(<HomePage />);

    // Check if the page has the correct background and layout classes
    const pageContainer = screen.getByTestId("home-page");
    expect(pageContainer).toBeInTheDocument();
    expect(pageContainer).toHaveClass(
      "min-h-screen",
      "flex",
      "items-center",
      "justify-center",
      "bg-gray-100",
      "py-2"
    );
  });

  it("should render the content wrapper with correct styling", () => {
    render(<HomePage />);

    const contentWrapper = screen.getByTestId("content-wrapper");
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).toHaveClass(
      "w-full",
      "max-w-xl",
      "md:max-w-2xl",
      "lg:max-w-3xl",
      "rounded-lg",
      "shadow-sm",
      "p-4"
    );
  });

  it("should render the TodoForm component", () => {
    render(<HomePage />);

    const todoForm = screen.getByTestId("todo-form");
    expect(todoForm).toBeInTheDocument();
    expect(todoForm).toHaveTextContent("Todo Form Component");
  });
});
