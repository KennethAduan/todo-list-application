import React from "react";
import { Button, InputField } from "../../../components/index";
import { Plus, X } from "lucide-react";

interface TodoItemProps {
  todo: { title: string; description: string };
  index: number;
  isOnlyItem: boolean;
  error?: string;
  onUpdate: (
    index: number,
    field: "title" | "description",
    value: string
  ) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  isOnlyItem,
  error,
  onUpdate,
  onAdd,
  onDelete,
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <InputField
          value={todo.title}
          onChange={(e) => onUpdate(index, "title", e.target.value)}
          placeholder="Task Name"
          error={error}
          variant={error ? "error" : "default"}
        />
      </div>
      <div className="flex-shrink-0 pt-0">
        {isOnlyItem ? (
          <Button type="button" size="icon" variant="outline" onClick={onAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            variant="destructive"
            onClick={() => onDelete(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
