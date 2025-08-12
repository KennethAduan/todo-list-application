import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type {
  Todo,
  CreateTodo,
  CreateTodoWithDescription,
} from "../schema/Todo.schema";
import {
  CreateTodoSchema,
  CreateTodoWithDescriptionSchema,
} from "../schema/Todo.schema";

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: CreateTodo) => void;
  addTodoWithDescription: (todo: CreateTodoWithDescription) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, "id">>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  getTodoById: (id: string) => Todo | undefined;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
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

      updateTodo: (id: string, updates: Partial<Omit<Todo, "id">>) => {
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
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
