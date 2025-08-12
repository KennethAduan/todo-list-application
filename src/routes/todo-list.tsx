import { createFileRoute, type FileRoutesByPath } from "@tanstack/react-router";
import { APP_ROUTES } from "@/constants/app.routes";
import TodoListPage from "@/pages/todo-list/TodoListPage";

export const Route = createFileRoute(
  APP_ROUTES.TODO_LIST as keyof FileRoutesByPath
)({
  component: TodoListPage,
});
