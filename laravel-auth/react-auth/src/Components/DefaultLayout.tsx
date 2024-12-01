import { Navigate, Outlet } from "react-router";
import { useStateContext } from "../context/UseStateContext";

export default function DefaultLayout() {
    const { token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div>
            <div>Default</div>
            <Outlet />
        </div>
    );
}
