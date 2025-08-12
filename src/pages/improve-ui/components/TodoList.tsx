import React from "react";
import { TodoItem } from "./TodoItem";
import type { Todo } from "@/schema/Todo.schema";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.filter((todo) => !todo.completed).length;

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 text-slate-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          No todos yet
        </h3>
        <p className="text-slate-600">
          Get started by adding your first todo above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">
          Your Todos ({todos.length})
        </h2>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span>Completed: {completedCount}</span>
          <span className="w-3 h-3 bg-blue-500 rounded-full ml-3"></span>
          <span>Pending: {pendingCount}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
