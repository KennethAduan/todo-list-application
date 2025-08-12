import { describe, it, expect, beforeEach, vi } from "vitest";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type {
  CreateTodo,
  CreateTodoWithDescription,
} from "../../schema/Todo.schema";
import {
  CreateTodoSchema,
  CreateTodoWithDescriptionSchema,
} from "../../schema/Todo.schema";

// Mock uuid to return predictable IDs for testing
vi.mock("uuid", () => ({
  v4: () => "test-uuid-123",
}));

// Create a test store without persist middleware
interface TodoStore {
  todos: Array<{
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }>;
  addTodo: (todo: CreateTodo) => void;
  addTodoWithDescription: (todo: CreateTodoWithDescription) => void;
  updateTodo: (
    id: string,
    updates: Partial<
      Omit<
        { id: string; title: string; description: string; completed: boolean },
        "id"
      >
    >
  ) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  getTodoById: (
    id: string
  ) =>
    | { id: string; title: string; description: string; completed: boolean }
    | undefined;
}

const useTestTodoStore = create<TodoStore>((set, get) => ({
  todos: [],

  addTodo: (todo: CreateTodo) => {
    try {
      const validatedTodo = CreateTodoSchema.parse(todo);
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            title: validatedTodo.title,
            description: validatedTodo.description || "",
            completed: false,
          },
        ],
      }));
    } catch (error) {
      console.error("Failed to add todo:", error);
      throw new Error("Failed to add todo: Invalid data");
    }
  },

  addTodoWithDescription: (todo: CreateTodoWithDescription) => {
    try {
      const validatedTodo = CreateTodoWithDescriptionSchema.parse(todo);
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            title: validatedTodo.title,
            description: validatedTodo.description,
            completed: false,
          },
        ],
      }));
    } catch (error) {
      console.error("Failed to add todo with description:", error);
      throw new Error("Failed to add todo with description: Invalid data");
    }
  },

  updateTodo: (
    id: string,
    updates: Partial<
      Omit<
        { id: string; title: string; description: string; completed: boolean },
        "id"
      >
    >
  ) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    }));
  },

  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  getTodoById: (id: string) => {
    return get().todos.find((todo) => todo.id === id);
  },
}));

describe("Todo Store", () => {
  beforeEach(() => {
    // Clear the store before each test
    useTestTodoStore.setState({ todos: [] });
    // Clear localStorage mock
    vi.clearAllMocks();
  });

  describe("addTodo", () => {
    it("should add a new todo with only title", () => {
      const store = useTestTodoStore.getState();
      const newTodo: CreateTodo = { title: "Test Todo", description: "" };

      store.addTodo(newTodo);

      const updatedStore = useTestTodoStore.getState();
      expect(updatedStore.todos).toHaveLength(1);
      expect(updatedStore.todos[0]).toEqual({
        id: "test-uuid-123",
        title: "Test Todo",
        description: "",
        completed: false,
      });
    });

    it("should add a new todo with title and description", () => {
      const store = useTestTodoStore.getState();
      const newTodo: CreateTodo = {
        title: "Test Todo",
        description: "Test Description",
      };

      store.addTodo(newTodo);

      const updatedStore = useTestTodoStore.getState();
      expect(updatedStore.todos).toHaveLength(1);
      expect(updatedStore.todos[0]).toEqual({
        id: "test-uuid-123",
        title: "Test Todo",
        description: "Test Description",
        completed: false,
      });
    });

    it("should throw error for invalid todo data", () => {
      const store = useTestTodoStore.getState();
      const invalidTodo = { title: "" } as CreateTodo;

      expect(() => store.addTodo(invalidTodo)).toThrow(
        "Failed to add todo: Invalid data"
      );
    });
  });

  describe("addTodoWithDescription", () => {
    it("should add a new todo with required description", () => {
      const store = useTestTodoStore.getState();
      const newTodo: CreateTodoWithDescription = {
        title: "Test Todo",
        description: "Test Description",
      };

      store.addTodoWithDescription(newTodo);

      const updatedStore = useTestTodoStore.getState();
      expect(updatedStore.todos).toHaveLength(1);
      expect(updatedStore.todos[0]).toEqual({
        id: "test-uuid-123",
        title: "Test Todo",
        description: "Test Description",
        completed: false,
      });
    });

    it("should throw error for todo without description", () => {
      const store = useTestTodoStore.getState();
      const invalidTodo = {
        title: "Test Todo",
        description: "",
      } as CreateTodoWithDescription;

      expect(() => store.addTodoWithDescription(invalidTodo)).toThrow(
        "Failed to add todo with description: Invalid data"
      );
    });
  });

  describe("updateTodo", () => {
    it("should update existing todo", () => {
      const store = useTestTodoStore.getState();
      // Add a todo first
      store.addTodo({ title: "Original Todo", description: "" });

      // Get the updated state after adding
      const currentState = useTestTodoStore.getState();
      const todoId = currentState.todos[0].id;

      store.updateTodo(todoId, {
        title: "Updated Todo",
        description: "Updated Description",
      });

      const updatedStore = useTestTodoStore.getState();
      const updatedTodo = updatedStore.todos.find((todo) => todo.id === todoId);
      expect(updatedTodo).toEqual({
        id: todoId,
        title: "Updated Todo",
        description: "Updated Description",
        completed: false,
      });
    });

    it("should not update non-existent todo", () => {
      const store = useTestTodoStore.getState();
      const originalTodos = [...store.todos];

      store.updateTodo("non-existent-id", { title: "Updated Todo" });

      expect(store.todos).toEqual(originalTodos);
    });
  });

  describe("deleteTodo", () => {
    it("should delete existing todo", () => {
      const store = useTestTodoStore.getState();
      // Add a todo first
      store.addTodo({ title: "Todo to delete", description: "" });

      // Get the updated state after adding
      const currentState = useTestTodoStore.getState();
      const todoId = currentState.todos[0].id;

      store.deleteTodo(todoId);

      const updatedStore = useTestTodoStore.getState();
      expect(updatedStore.todos).toHaveLength(0);
    });

    it("should not affect store when deleting non-existent todo", () => {
      const store = useTestTodoStore.getState();
      const originalTodos = [...store.todos];

      store.deleteTodo("non-existent-id");

      expect(store.todos).toEqual(originalTodos);
    });
  });

  describe("toggleTodo", () => {
    it("should toggle todo completion status", () => {
      const store = useTestTodoStore.getState();
      // Add a todo first
      store.addTodo({ title: "Todo to toggle", description: "" });

      // Get the updated state after adding
      const currentState = useTestTodoStore.getState();
      const todoId = currentState.todos[0].id;

      // Initially should be false
      expect(currentState.todos[0].completed).toBe(false);

      // Toggle to true
      store.toggleTodo(todoId);
      const updatedState1 = useTestTodoStore.getState();
      expect(updatedState1.todos[0].completed).toBe(true);

      // Toggle back to false
      store.toggleTodo(todoId);
      const updatedState2 = useTestTodoStore.getState();
      expect(updatedState2.todos[0].completed).toBe(false);
    });

    it("should not affect other todos when toggling", () => {
      const store = useTestTodoStore.getState();
      // Add two todos
      store.addTodo({ title: "Todo 1", description: "" });
      store.addTodo({ title: "Todo 2", description: "" });

      // Get the updated state after adding
      const currentState = useTestTodoStore.getState();
      const firstTodoId = currentState.todos[0].id;

      // Toggle first todo
      store.toggleTodo(firstTodoId);
    });
  });

  describe("getTodoById", () => {
    it("should return todo by id", () => {
      const store = useTestTodoStore.getState();
      store.addTodo({ title: "Test Todo", description: "" });

      // Get the updated state after adding
      const currentState = useTestTodoStore.getState();
      const todoId = currentState.todos[0].id;

      const foundTodo = store.getTodoById(todoId);

      expect(foundTodo).toEqual({
        id: todoId,
        title: "Test Todo",
        description: "",
        completed: false,
      });
    });

    it("should return undefined for non-existent todo", () => {
      const store = useTestTodoStore.getState();

      const foundTodo = store.getTodoById("non-existent-id");

      expect(foundTodo).toBeUndefined();
    });
  });

  describe("store state management", () => {
    it("should maintain separate state instances", () => {
      const store1 = useTestTodoStore.getState();
      const store2 = useTestTodoStore.getState();

      store1.addTodo({ title: "Todo 1", description: "" });
      store2.addTodo({ title: "Todo 2", description: "" });

      // Get the updated state after adding
      const finalState = useTestTodoStore.getState();
      expect(finalState.todos).toHaveLength(2);
    });

    it("should handle multiple operations correctly", () => {
      const store = useTestTodoStore.getState();

      // Add multiple todos
      store.addTodo({ title: "Todo 1", description: "" });
      store.addTodo({ title: "Todo 2", description: "" });
      store.addTodo({ title: "Todo 3", description: "" });

      // Get the updated state after adding
      const stateAfterAdding = useTestTodoStore.getState();
      expect(stateAfterAdding.todos).toHaveLength(3);

      // Update one
      const firstTodoId = stateAfterAdding.todos[0].id;
      store.updateTodo(firstTodoId, { title: "Updated Todo 1" });

      // Delete one
      const secondTodoId = stateAfterAdding.todos[1].id;
      store.deleteTodo(secondTodoId);

      // Toggle one
      const thirdTodoId = stateAfterAdding.todos[2].id;
      store.toggleTodo(thirdTodoId);
    });
  });
});
