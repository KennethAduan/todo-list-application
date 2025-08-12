import { Link, useMatchRoute } from "@tanstack/react-router";
import { APP_ROUTES } from "@/constants/app.routes";
import { cn } from "@/utils";

const Navbar = () => {
  const matchRoute = useMatchRoute();

  const isActive = (path: string) => matchRoute({ to: path });

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <h1 className="text-xl font-bold text-gray-900 mr-8">Todo App</h1>
          <div className="flex space-x-1">
            <Link
              to="/"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive(APP_ROUTES.HOME)
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              )}
            >
              Add Todo
            </Link>
            <Link
              to="/todo-list"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive(APP_ROUTES.TODO_LIST)
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              )}
            >
              Todo List
            </Link>
            <Link
              to="/improved-ui"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive(APP_ROUTES.IMPROVED_UI)
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              )}
            >
              Improved UI
            </Link>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <h1 className="text-sm text-gray-500">Created By: Kenneth Aduan</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
