import Overview from "../Pages/Overview";
import SellPage from "../Pages/Sell";
import { Login } from "../Pages/User/login";
import { Signup } from "../Pages/User/signup";

export const routes = [
    {
        name: 'dashboard',
        title: 'Dashboard',
        component: Overview,
        withHeader: true,
        protected: true
    },
    {
        name: 'sell',
        title: 'Vendre un produit',
        component: SellPage,
        withHeader: true,
        protected: true
    }
]