import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import FoodItems from "../pages/FoodItems";
import MainLayout from "../layout/Layout";
import FoodItem from "../Details/FoodItem";
import OrderList from "../List/OrderList";
import Users from "../pages/Users";
import LoginPage from "../pages/Login/LoginPage";
import DeliveryStatus from "../List/DeliveryStatus";




const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/foods",
                element: <FoodItems />
            },
            {
                path: "/foods/:id",
                element: <FoodItem />
            },
            {
                path: "/orders",
                element: <OrderList />
            },
            {
                path: "/delivery",
                element: <DeliveryStatus></DeliveryStatus>
            },
            {
                path: "/users",
                element: <Users />
            },


        ]

    },
    {
        path: "/login",
        element: <LoginPage />
    },
])

export default router;