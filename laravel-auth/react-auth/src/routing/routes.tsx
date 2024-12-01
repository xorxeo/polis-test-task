
import DefaultLayout from "../Components/DefaultLayout";
import GuestLayout from "../Components/GuestLayout";
import Login from "../views/Login";
import Register from "../views/Register";
import Users from "../views/Users";

export const ROUTES = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
];
