import { z } from "zod";

// Schema for creating a todo - only title required
export const CreateTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
});

// Schema for creating a todo with required description
export const CreateTodoWithDescriptionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

// Full todo schema (for existing todos)
export const TodoSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

// Types
export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodo = z.infer<typeof CreateTodoSchema>;
export type CreateTodoWithDescription = z.infer<
  typeof CreateTodoWithDescriptionSchema
>;
