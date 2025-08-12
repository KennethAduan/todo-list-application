import React from "react";
import { Label } from "../../../components/index";

interface TodoSectionProps {
  title: string;
  children: React.ReactNode;
  error?: string;
}

export const TodoSection = ({ title, children, error }: TodoSectionProps) => {
  return (
    <div className="flex space-x-6">
      {/* Left side line */}
      <div className="relative flex-shrink-0 w-8">
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        <Label size="lg" required>
          {title}
        </Label>

        {children}

        {/* Validation error */}
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
};
