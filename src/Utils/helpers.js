import { routes } from "../Routes/routes";

export const protectedRoutes = routes.filter(route => route.protected);
export const withHeaderRoutes = routes.filter(route => route.withHeader);
export const notProtectedRoutes = routes.filter(route => !route.protected);