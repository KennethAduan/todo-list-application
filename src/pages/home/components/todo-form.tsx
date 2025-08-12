import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodos } from "../../../hooks/useTodos";
import { CreateTodoWithDescriptionSchema } from "../../../schema/Todo.schema";
import { z } from "zod";
import { Button } from "@/components";
import { TodoItem } from "./todo-item";
import { TodoItemWithDescription } from "./todo-item-with-description";
import { TodoList } from "./todo-list";
import { TodoSection } from "./todo-section";

// Form validation schema
const formSchema = z.object({
  todos: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string(),
      })
    )
    .min(1, "At least one todo is required"),
  todosWithDescription: z
    .array(CreateTodoWithDescriptionSchema)
    .min(1, "At least one todo with description is required"),
});

type FormData = z.infer<typeof formSchema>;

export const TodoForm: React.FC = () => {
  const { createTodo, createTodoWithDescription } = useTodos();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todos: [{ title: "", description: "" }],
      todosWithDescription: [{ title: "", description: "" }],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const {
    fields: todoFields,
    append: appendTodo,
    remove: removeTodo,
  } = useFieldArray({
    control,
    name: "todos",
  });

  const {
    fields: todoWithDescriptionFields,
    append: appendTodoWithDescription,
    remove: removeTodoWithDescription,
  } = useFieldArray({
    control,
    name: "todosWithDescription",
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Create todos without description (only title required)
      for (const todo of data.todos) {
        if (todo.title.trim()) {
          await createTodo({
            title: todo.title.trim(),
            description: todo.description,
          });
        }
      }

      // Create todos with description
      for (const todo of data.todosWithDescription) {
        if (todo.title.trim() && todo.description.trim()) {
          await createTodoWithDescription({
            title: todo.title.trim(),
            description: todo.description.trim(),
          });
        }
      }

      // Reset form
      reset();
    } catch (error) {
      console.error("Error creating todos:", error);
    }
  };

  const addTodoItem = () => {
    appendTodo({ title: "", description: "" });
  };

  const addTodoWithDescriptionItem = () => {
    appendTodoWithDescription({ title: "", description: "" });
  };

  const deleteTodo = (index: number) => {
    if (todoFields.length > 1) {
      removeTodo(index);
    }
  };

  const deleteTodoWithDescription = (index: number) => {
    if (todoWithDescriptionFields.length > 1) {
      removeTodoWithDescription(index);
    }
  };

  const getFieldError = (fieldName: string) => {
    const fieldErrors = errors as Record<string, unknown>;
    const fieldPath = fieldName.split(".");
    let current: unknown = fieldErrors;

    for (const path of fieldPath) {
      if (
        current &&
        typeof current === "object" &&
        current !== null &&
        path in current
      ) {
        current = (current as Record<string, unknown>)[path];
      } else {
        return undefined;
      }
    }

    return typeof current === "object" &&
      current !== null &&
      "message" in current
      ? (current as { message: string }).message
      : undefined;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add FORM</h1>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* TODO LIST Section */}
          <TodoSection title="TODO LIST" error={errors.todos?.message}>
            <TodoList onAdd={addTodoItem} addButtonText="Add TODO LIST">
              {todoFields.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  index={index}
                  isOnlyItem={todoFields.length === 1}
                  error={getFieldError(`todos.${index}.title`)}
                  onAdd={addTodoItem}
                  onDelete={deleteTodo}
                />
              ))}
            </TodoList>
          </TodoSection>

          {/* TODO LIST with Description Section */}
          <TodoSection
            title="TODO LIST with Description"
            error={errors.todosWithDescription?.message}
          >
            <TodoList
              onAdd={addTodoWithDescriptionItem}
              addButtonText="Add TODO LIST with Description"
            >
              {todoWithDescriptionFields.map((todo, index) => (
                <TodoItemWithDescription
                  key={todo.id}
                  index={index}
                  isOnlyItem={todoWithDescriptionFields.length === 1}
                  titleError={getFieldError(
                    `todosWithDescription.${index}.title`
                  )}
                  descriptionError={getFieldError(
                    `todosWithDescription.${index}.description`
                  )}
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
      </FormProvider>
    </div>
  );
};
