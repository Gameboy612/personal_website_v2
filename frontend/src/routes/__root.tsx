import { Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: Outlet,
  notFoundComponent: () => <div>Not Found</div>,
})
