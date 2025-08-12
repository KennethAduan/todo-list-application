import React from "react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Checkbox } from "@/components/checkbox";
import type { Todo } from "@/schema/Todo.schema";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      className={`shadow-md border-0 transition-all duration-200 hover:shadow-lg ${
        todo.completed
          ? "bg-green-50/50 border-l-4 border-l-green-500"
          : "bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                checkboxSize="lg"
                className="cursor-pointer"
              />
              <h3
                className={`text-lg font-semibold ${
                  todo.completed
                    ? "text-green-700 line-through"
                    : "text-slate-800"
                }`}
              >
                {todo.title}
              </h3>
            </div>

            {todo.description && (
              <p
                className={`text-sm ml-8 ${
                  todo.completed
                    ? "text-green-600 line-through"
                    : "text-slate-600"
                }`}
              >
                {todo.description}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(todo.id)}
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="text-slate-600 hover:text-red-600 hover:bg-red-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
