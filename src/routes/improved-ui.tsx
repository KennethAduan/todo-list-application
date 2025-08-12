import ImprovedUiPage from "@/pages/improve-ui/ImprovedUiPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/improved-ui")({
  component: ImprovedUiPage,
});
