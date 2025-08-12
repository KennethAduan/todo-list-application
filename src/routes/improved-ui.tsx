import { APP_ROUTES } from "@/constants/app.routes";
import ImprovedUiPage from "@/pages/improve-ui/ImprovedUiPage";
import { createFileRoute, type FileRoutesByPath } from "@tanstack/react-router";

export const Route = createFileRoute(
  APP_ROUTES.IMPROVED_UI as keyof FileRoutesByPath
)({
  component: ImprovedUiPage,
});
