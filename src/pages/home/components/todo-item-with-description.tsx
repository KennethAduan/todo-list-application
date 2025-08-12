import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button, InputField } from "../../../components/index";
import { Plus, X } from "lucide-react";

interface TodoItemWithDescriptionProps {
  index: number;
  isOnlyItem: boolean;
  titleError?: string;
  descriptionError?: string;
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const TodoItemWithDescription: React.FC<
  TodoItemWithDescriptionProps
> = ({ index, isOnlyItem, titleError, descriptionError, onAdd, onDelete }) => {
  const { control } = useFormContext();

  return (
    <div className="flex items-start gap-3">
      <div className="flex-1 flex gap-3">
        <Controller
          name={`todosWithDescription.${index}.title`}
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Task Name"
              error={titleError}
              variant={titleError ? "error" : "default"}
            />
          )}
        />
        <Controller
          name={`todosWithDescription.${index}.description`}
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Description"
              error={descriptionError}
              variant={descriptionError ? "error" : "default"}
            />
          )}
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
