import { useTodoStore } from "../store/Todo.store";
import type {
  CreateTodo,
  CreateTodoWithDescription,
} from "../schema/Todo.schema";

export const useTodos = () => {
  const {
    todos,
    addTodo,
    addTodoWithDescription,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getTodoById,
  } = useTodoStore();

  // Computed values
  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const totalTodos = todos.length;

  const createTodo = async (todo: CreateTodo) => {
    try {
      addTodo(todo);
      return { success: true };
    } catch (error) {
      console.error("Error creating todo:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create todo",
      };
    }
  };

  const createTodoWithDescription = async (todo: CreateTodoWithDescription) => {
    try {
      addTodoWithDescription(todo);
      return { success: true };
    } catch (error) {
      console.error("Error creating todo with description:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create todo with description",
      };
    }
  };

  const removeTodo = async (id: string) => {
    try {
      deleteTodo(id);
      return { success: true };
    } catch (error) {
      console.error("Error removing todo:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to remove todo",
      };
    }
  };

  return {
    // Data
    todos,
    completedTodos,
    pendingTodos,
    totalTodos,

    // Actions
    createTodo,
    createTodoWithDescription,
    updateTodo,
    removeTodo,
    toggleTodo,
    getTodoById,
  };
};
