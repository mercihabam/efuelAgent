import Overview from "../Pages/Overview";
import { Login } from "../Pages/User/login";
import { Signup } from "../Pages/User/signup";

export const routes = [
    {
        name: 'dashboard',
        component: Overview,
        withHeader: true,
        protected: true
    }
]