import React, { useState } from "react";

import { useTodos } from "../../../hooks/useTodos";
import type { CreateTodoWithDescription } from "../../../schema/Todo.schema";
import {
  CreateTodoSchema,
  CreateTodoWithDescriptionSchema,
} from "../../../schema/Todo.schema";
import { z } from "zod";
import { Button } from "@/components";
import { TodoItem } from "./todo-item";
import { TodoItemWithDescription } from "./todo-item-with-description";
import { TodoList } from "./todo-list";
import { TodoSection } from "./todo-section";

// Form validation schemas
const todoFormSchema = z.object({
  todos: z.array(CreateTodoSchema).min(1, "At least one todo is required"),
});

const todoWithDescriptionSchema = z.object({
  todosWithDescription: z
    .array(CreateTodoWithDescriptionSchema)
    .min(1, "At least one todo with description is required"),
});

export const TodoForm: React.FC = () => {
  const { createTodo, createTodoWithDescription } = useTodos();

  const [todos, setTodos] = useState<
    Array<{ title: string; description: string }>
  >([{ title: "", description: "" }]);
  const [todosWithDescription, setTodosWithDescription] = useState<
    CreateTodoWithDescription[]
  >([{ title: "", description: "" }]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate todos using the schema (only title required)
    const todosResult = todoFormSchema.safeParse({ todos });
    if (!todosResult.success) {
      newErrors.todos = todosResult.error.issues[0]?.message || "Invalid todos";
    }

    // Validate todos with description using the CreateTodoWithDescriptionSchema
    const todosWithDescriptionResult = todoWithDescriptionSchema.safeParse({
      todosWithDescription,
    });
    if (!todosWithDescriptionResult.success) {
      newErrors.todosWithDescription =
        todosWithDescriptionResult.error.issues[0]?.message ||
        "Invalid todos with description";
    }

    // Validate individual todo items (only title required, description is optional)
    todos.forEach((todo, index) => {
      if (!todo.title.trim()) {
        newErrors[`todo-${index}`] = "Task name is required";
      }
      // Description validation is skipped for simple todos
    });

    // Validate individual todos with description (both title and description required)
    todosWithDescription.forEach((todo, index) => {
      // Use CreateTodoWithDescriptionSchema for individual validation
      const individualResult = CreateTodoWithDescriptionSchema.safeParse(todo);
      if (!individualResult.success) {
        const fieldErrors = individualResult.error.issues;
        fieldErrors.forEach((issue) => {
          if (issue.path.includes("title")) {
            newErrors[`todoWithDescription-${index}-title`] = issue.message;
          } else if (issue.path.includes("description")) {
            newErrors[`todoWithDescription-${index}-description`] =
              issue.message;
          }
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time validation for individual fields
  const validateField = (
    fieldType: "todo" | "todoWithDescription",
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const newErrors = { ...errors };
    const errorKey =
      fieldType === "todo" ? `todo-${index}` : `${fieldType}-${index}-${field}`;

    if (fieldType === "todo") {
      // For simple todos, only title is required
      if (field === "title" && !value.trim()) {
        newErrors[errorKey] = "Task name is required";
      } else if (field === "title") {
        delete newErrors[errorKey];
      }
      // Description validation is skipped for simple todos
    } else {
      // For todos with description, both fields are required
      if (!value.trim()) {
        newErrors[errorKey] =
          field === "title"
            ? "Task name is required"
            : "Description is required";
      } else {
        delete newErrors[errorKey];
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Create todos without description (only title required)
      for (const todo of todos) {
        if (todo.title.trim()) {
          await createTodo({
            title: todo.title.trim(),
            description: todo.description,
          });
        }
      }

      // Create todos with description
      for (const todo of todosWithDescription) {
        if (todo.title.trim() && todo.description.trim()) {
          await createTodoWithDescription({
            title: todo.title.trim(),
            description: todo.description.trim(),
          });
        }
      }

      // Reset form
      setTodos([{ title: "", description: "" }]);
      setTodosWithDescription([{ title: "", description: "" }]);
      setErrors({});
    } catch (error) {
      console.error("Error creating todos:", error);
    }
  };

  const addTodoItem = () => {
    setTodos([...todos, { title: "", description: "" }]);
  };

  const addTodoWithDescriptionItem = () => {
    setTodosWithDescription([
      ...todosWithDescription,
      { title: "", description: "" },
    ]);
  };

  const deleteTodo = (index: number) => {
    if (todos.length > 1) {
      setTodos(todos.filter((_, i) => i !== index));
    }
  };

  const deleteTodoWithDescription = (index: number) => {
    if (todosWithDescription.length > 1) {
      setTodosWithDescription(
        todosWithDescription.filter((_, i) => i !== index)
      );
    }
  };

  const updateTodo = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], [field]: value };
    setTodos(newTodos);
    validateField("todo", index, field, value);
  };

  const updateTodoWithDescription = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const newTodos = [...todosWithDescription];
    newTodos[index] = { ...newTodos[index], [field]: value };
    setTodosWithDescription(newTodos);
    validateField("todoWithDescription", index, field, value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add FORM</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* TODO LIST Section */}
        <TodoSection title="TODO LIST" error={errors.todos}>
          <TodoList onAdd={addTodoItem} addButtonText="Add TODO LIST">
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                index={index}
                isOnlyItem={todos.length === 1}
                error={errors[`todo-${index}`]}
                onUpdate={updateTodo}
                onAdd={addTodoItem}
                onDelete={deleteTodo}
              />
            ))}
          </TodoList>
        </TodoSection>

        {/* TODO LIST with Description Section */}
        <TodoSection
          title="TODO LIST with Description"
          error={errors.todosWithDescription}
        >
          <TodoList
            onAdd={addTodoWithDescriptionItem}
            addButtonText="Add TODO LIST with Description"
          >
            {todosWithDescription.map((todo, index) => (
              <TodoItemWithDescription
                key={index}
                todo={todo}
                index={index}
                isOnlyItem={todosWithDescription.length === 1}
                titleError={errors[`todoWithDescription-${index}-title`]}
                descriptionError={
                  errors[`todoWithDescription-${index}-description`]
                }
                onUpdate={updateTodoWithDescription}
                onAdd={addTodoWithDescriptionItem}
                onDelete={deleteTodoWithDescription}
              />
            ))}
          </TodoList>
        </TodoSection>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 text-lg font-semibold"
        >
          ADD FORM
        </Button>
      </form>
    </div>
  );
};
