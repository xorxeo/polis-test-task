
import { Navigate, Outlet } from "react-router";
import { useStateContext } from "../context/UseStateContext";

export default function GuestLayout() {
     const { token } = useStateContext();
     if (token) {
         return <Navigate to="/" replace />;
     }
    return (
        <div>
            <div>Guest</div>
            <Outlet />
        </div>
    );
}
