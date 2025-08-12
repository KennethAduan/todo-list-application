import React from "react";
import { Button } from "../../../components/index";
import { Plus } from "lucide-react";

interface TodoListProps {
  children: React.ReactNode;
  onAdd: () => void;
  addButtonText: string;
}

export const TodoList = ({ children, onAdd, addButtonText }: TodoListProps) => {
  return (
    <div className="space-y-4">
      {/* Todo Items */}
      <div className="space-y-3">{children}</div>

      {/* Add Button */}
      <Button
        type="button"
        onClick={onAdd}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        {addButtonText}
      </Button>
    </div>
  );
};
