import React, { useState } from "react";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { InputField } from "@/components/input-field";

interface TodoFormProps {
  onSubmit: (todo: { title: string; description?: string }) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDetailedMode, setIsDetailedMode] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (isDetailedMode && !description.trim()) {
      newErrors.description = "Description is required in detailed mode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const todoData = isDetailedMode
      ? { title: title.trim(), description: description.trim() }
      : { title: title.trim() };

    onSubmit(todoData);
    handleClearForm();
  };

  const handleClearForm = () => {
    setTitle("");
    setDescription("");
    setIsDetailedMode(false);
    setErrors({});
  };

  const handleModeToggle = (detailed: boolean) => {
    setIsDetailedMode(detailed);
    setErrors({});
    if (!detailed) {
      setDescription("");
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-slate-800">Add New Todo</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">Mode:</span>
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => handleModeToggle(false)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  !isDetailedMode
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Simple
              </button>
              <button
                type="button"
                onClick={() => handleModeToggle(true)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  isDetailedMode
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <InputField
              placeholder="Enter todo title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title)
                  setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              inputSize="lg"
              error={errors.title}
              leftIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              }
            />

            {isDetailedMode && (
              <InputField
                placeholder="Enter description..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                inputSize="lg"
                error={errors.description}
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                }
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
              {isDetailedMode ? (
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Detailed mode: Title and description required
                </span>
              ) : (
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Simple mode: Quick add with just title
                </span>
              )}
            </div>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={handleClearForm}>
                Clear
              </Button>
              <Button
                type="submit"
                disabled={
                  !title.trim() || (isDetailedMode && !description.trim())
                }
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDetailedMode ? "Add Detailed Todo" : "Add Todo"}
              </Button>
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};
