import { routes } from "../Routes/routes";

export const protectedRoutes = routes.filter(route => route.protected);
export const withHeaderRoutes = routes.filter(route => route.withHeader);
export const notProtectedRoutes = routes.filter(route => !route.protected);

export function getRoute(name){
    const route = routes.find(elmt => elmt.name === name);
    return route;
};

export function agentId(agents, stationId){
    const agent = agents.find(elmt => elmt.stationId === stationId);
    return agent.id
};