import Overview from "../Pages/Overview";
import RechargePage from "../Pages/Recharge";
import SellPage from "../Pages/Sell";
import ViewTransactions from "../Pages/Transactions";
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
    },
    {
        name: 'recharge',
        title: 'Recharger un client',
        component: RechargePage,
        withHeader: true,
        protected: true
    },
    {
        name: 'transactions',
        title: 'Mes transactions',
        component: ViewTransactions,
        withHeader: true,
        protected: true
    }
]