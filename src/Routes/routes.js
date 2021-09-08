import Overview from "../Pages/Overview";
import { Login } from "../Pages/User/login";

export const routes = [
    {
        name: 'dashboard',
        component: Overview,
        withHeader: true,
        protected: true
    }
]