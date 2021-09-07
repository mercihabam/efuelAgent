import { routes } from "../Routes/routes";

export const protectedRoutes = routes.filter(route => route.protected);
export const notProtectedRoutes = routes.filter(route => !route.protected);