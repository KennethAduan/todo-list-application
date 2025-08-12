import { describe, it, expect } from "vitest";
import {
  CreateTodoSchema,
  CreateTodoWithDescriptionSchema,
  TodoSchema,
} from "../Todo.schema";

describe("Todo Schemas", () => {
  describe("CreateTodoSchema", () => {
    it("should validate todo with only title", () => {
      const validTodo = { title: "Test Todo" };
      const result = CreateTodoSchema.safeParse(validTodo);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Test Todo");
        expect(result.data.description).toBe("");
      }
    });

    it("should validate todo with title and description", () => {
      const validTodo = { title: "Test Todo", description: "Test Description" };
      const result = CreateTodoSchema.safeParse(validTodo);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Test Todo");
        expect(result.data.description).toBe("Test Description");
      }
    });

    it("should reject todo with empty title", () => {
      const invalidTodo = { title: "" };
      const result = CreateTodoSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Title is required");
      }
    });

    it("should reject todo with whitespace-only title", () => {
      const invalidTodo = { title: "   " };
      const result = CreateTodoSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Title is required");
      }
    });

    it("should reject todo without title", () => {
      const invalidTodo = {};
      const result = CreateTodoSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Invalid input: expected string, received undefined"
        );
      }
    });
  });

  describe("CreateTodoWithDescriptionSchema", () => {
    it("should validate todo with title and description", () => {
      const validTodo = { title: "Test Todo", description: "Test Description" };
      const result = CreateTodoWithDescriptionSchema.safeParse(validTodo);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Test Todo");
        expect(result.data.description).toBe("Test Description");
      }
    });

    it("should reject todo with empty title", () => {
      const invalidTodo = { title: "", description: "Test Description" };
      const result = CreateTodoWithDescriptionSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Title is required");
      }
    });

    it("should reject todo with empty description", () => {
      const invalidTodo = { title: "Test Todo", description: "" };
      const result = CreateTodoWithDescriptionSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Description is required");
      }
    });

    it("should reject todo with whitespace-only description", () => {
      const invalidTodo = { title: "Test Todo", description: "   " };
      const result = CreateTodoWithDescriptionSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Description is required");
      }
    });

    it("should reject todo without description", () => {
      const invalidTodo = { title: "Test Todo" };
      const result = CreateTodoWithDescriptionSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Invalid input: expected string, received undefined"
        );
      }
    });

    it("should reject todo without title", () => {
      const invalidTodo = { description: "Test Description" };
      const result = CreateTodoWithDescriptionSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Invalid input: expected string, received undefined"
        );
      }
    });
  });

  describe("TodoSchema", () => {
    it("should validate complete todo", () => {
      const validTodo = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        title: "Test Todo",
        description: "Test Description",
        completed: true,
      };
      const result = TodoSchema.safeParse(validTodo);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(result.data.title).toBe("Test Todo");
        expect(result.data.description).toBe("Test Description");
        expect(result.data.completed).toBe(true);
      }
    });

    it("should validate todo with optional description", () => {
      const validTodo = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        title: "Test Todo",
        completed: false,
      };
      const result = TodoSchema.safeParse(validTodo);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(result.data.title).toBe("Test Todo");
        expect(result.data.description).toBeUndefined();
        expect(result.data.completed).toBe(false);
      }
    });

    it("should reject todo with invalid UUID", () => {
      const invalidTodo = {
        id: "invalid-uuid",
        title: "Test Todo",
        completed: false,
      };
      const result = TodoSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("invalid_format");
      }
    });

    it("should reject todo with empty title", () => {
      const invalidTodo = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        title: "",
        completed: false,
      };
      const result = TodoSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Too small: expected string to have >=1 characters"
        );
      }
    });

    it("should reject todo without required fields", () => {
      const invalidTodo = {
        id: "123e4567-e89b-12d3-a456-426614174000",
      };
      const result = TodoSchema.safeParse(invalidTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1); // only title missing, completed has default
      }
    });
  });

  describe("Schema Integration", () => {
    it("should allow CreateTodoSchema data to be used with TodoSchema", () => {
      const createTodoData = {
        title: "Test Todo",
        description: "Test Description",
      };
      const createResult = CreateTodoSchema.safeParse(createTodoData);

      expect(createResult.success).toBe(true);
      if (createResult.success) {
        // This should work as CreateTodoSchema provides the required fields for TodoSchema
        const todoData = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          ...createResult.data,
          completed: false,
        };
        const todoResult = TodoSchema.safeParse(todoData);
        expect(todoResult.success).toBe(true);
      }
    });

    it("should allow CreateTodoWithDescriptionSchema data to be used with TodoSchema", () => {
      const createTodoData = {
        title: "Test Todo",
        description: "Test Description",
      };
      const createResult =
        CreateTodoWithDescriptionSchema.safeParse(createTodoData);

      expect(createResult.success).toBe(true);
      if (createResult.success) {
        // This should work as CreateTodoWithDescriptionSchema provides the required fields for TodoSchema
        const todoData = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          ...createResult.data,
          completed: false,
        };
        const todoResult = TodoSchema.safeParse(todoData);
        expect(todoResult.success).toBe(true);
      }
    });
  });
});
