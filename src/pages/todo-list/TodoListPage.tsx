import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../components/dialog";
import { Button } from "../../components/button";
import { Checkbox } from "../../components/checkbox";
import { useToast } from "@/hooks/use-toast";

const TodoListPage = () => {
  const { todos, toggleTodo, removeTodo } = useTodos();
  const { addToast } = useToast();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<(typeof todos)[0] | null>(
    null
  );

  const handleViewTodo = (todo: (typeof todos)[0]) => {
    setSelectedTodo(todo);
    setViewDialogOpen(true);
  };

  const handleDeleteTodo = (todo: (typeof todos)[0]) => {
    setSelectedTodo(todo);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedTodo) {
      await removeTodo(selectedTodo.id);
      setDeleteDialogOpen(false);
      setSelectedTodo(null);
      addToast({
        title: "Todo deleted",
        description: "Todo deleted successfully",
        variant: "success",
      });
    }
  };

  const handleToggleTodo = async (id: string) => {
    toggleTodo(id);
  };

  if (todos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Todo List</h1>
          <p className="text-gray-600">
            No todos found. Create your first todo to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="ml-2"
                  />
                </TableCell>
                <TableCell>
                  <span
                    className={`font-medium ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                  >
                    {todo.title}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`${todo.completed ? "text-gray-500" : "text-gray-700"}`}
                  >
                    {todo.description || "No description"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewTodo(todo)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTodo(todo)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Todo Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Todo Details</DialogTitle>
            <DialogDescription>
              View the complete information for this todo item.
            </DialogDescription>
          </DialogHeader>
          {selectedTodo && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <p className="mt-1 text-gray-900">{selectedTodo.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedTodo.description || "No description provided"}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Todo</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this todo? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {selectedTodo && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">{selectedTodo.title}</p>
              {selectedTodo.description && (
                <p className="text-red-700 text-sm mt-1">
                  {selectedTodo.description}
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoListPage;
