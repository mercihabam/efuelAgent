import Overview from "../Pages/Overview";

export const routes = [
    {
        name: 'dashboard',
        component: Overview,
        withHeader: true,
        protected: true
    }
]