import { createFileRoute, type FileRoutesByPath } from "@tanstack/react-router";
import HomePage from "@/pages/home/HomePage";
import { APP_ROUTES } from "@/constants/app.routes";

export const Route = createFileRoute(APP_ROUTES.HOME as keyof FileRoutesByPath)(
  {
    component: HomePage,
  }
);
