import { Button, InputField } from "../../../components/index";
import { Plus, X } from "lucide-react";

interface TodoItemWithDescriptionProps {
  todo: { title: string; description: string };
  index: number;
  isOnlyItem: boolean;
  titleError?: string;
  descriptionError?: string;
  onUpdate: (
    index: number,
    field: "title" | "description",
    value: string
  ) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const TodoItemWithDescription = ({
  todo,
  index,
  isOnlyItem,
  titleError,
  descriptionError,
  onUpdate,
  onAdd,
  onDelete,
}: TodoItemWithDescriptionProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1 flex gap-3">
        <InputField
          value={todo.title}
          onChange={(e) => onUpdate(index, "title", e.target.value)}
          placeholder="Task Name"
          error={titleError}
          variant={titleError ? "error" : "default"}
        />
        <InputField
          value={todo.description}
          onChange={(e) => onUpdate(index, "description", e.target.value)}
          placeholder="Description"
          error={descriptionError}
          variant={descriptionError ? "error" : "default"}
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
