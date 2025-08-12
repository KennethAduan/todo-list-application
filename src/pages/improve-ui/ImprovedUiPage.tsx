import React, { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";
import { EditTodoDialog } from "./components/EditTodoDialog";
import type { Todo } from "@/schema/Todo.schema";

const ImprovedUiPage: React.FC = () => {
  const {
    todos,
    createTodo,
    createTodoWithDescription,
    toggleTodo,
    removeTodo,
    updateTodo,
    getTodoById,
  } = useTodos();

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    todoId: string;
    todoTitle: string;
  }>({
    isOpen: false,
    todoId: "",
    todoTitle: "",
  });

  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    todo: Todo | null;
  }>({
    isOpen: false,
    todo: null,
  });

  const handleSubmit = (todo: { title: string; description?: string }) => {
    if (todo.description) {
      const result = createTodoWithDescription({
        title: todo.title,
        description: todo.description,
      });

      if (!result.success) {
        console.error("Failed to create detailed todo:", result.error);
        // You could add a toast notification here
      }
    } else {
      const result = createTodo({
        title: todo.title,
      });

      if (!result.success) {
        console.error("Failed to create simple todo:", result.error);
        // You could add a toast notification here
      }
    }
  };

  const handleToggle = (id: string) => {
    toggleTodo(id);
  };

  const handleEdit = (id: string) => {
    const todo = getTodoById(id);
    if (todo) {
      setEditDialog({
        isOpen: true,
        todo,
      });
    }
  };

  const handleSaveEdit = (
    id: string,
    updates: { title: string; description?: string }
  ) => {
    updateTodo(id, updates);
    setEditDialog({ isOpen: false, todo: null });
  };

  const handleDelete = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setDeleteDialog({
        isOpen: true,
        todoId: id,
        todoTitle: todo.title,
      });
    }
  };

  const confirmDelete = () => {
    const result = removeTodo(deleteDialog.todoId);

    if (!result.success) {
      console.error("Failed to delete todo:", result.error);
      // You could add a toast notification here
    }

    setDeleteDialog({ isOpen: false, todoId: "", todoTitle: "" });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ isOpen: false, todoId: "", todoTitle: "" });
  };

  const closeEditDialog = () => {
    setEditDialog({ isOpen: false, todo: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Todo List
          </h1>
          <p className="text-lg text-slate-600">
            Organize your tasks and boost your productivity
          </p>
        </div>

        {/* Add Todo Form */}
        <TodoForm onSubmit={handleSubmit} />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={deleteDialog.isOpen}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
          todoTitle={deleteDialog.todoTitle}
        />

        {/* Edit Todo Dialog */}
        <EditTodoDialog
          isOpen={editDialog.isOpen}
          onClose={closeEditDialog}
          onSave={handleSaveEdit}
          todo={editDialog.todo}
        />
      </div>
    </div>
  );
};

export default ImprovedUiPage;
