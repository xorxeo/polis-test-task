import { Navigate, Outlet } from "react-router";
import { useStateContext } from "../context/UseStateContext";
import axiosClient from "../AxiosClient";
import { MouseEvent, useEffect } from "react";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    const onLogout = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // localStorage.setItem("ACCESS_TOKEN", "")
        axiosClient.post("/logout").then(() => {
            setUser!(null);
            setToken!(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser!(data);
        });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>Header</div>
                    <div >You Authorized</div>
                    <div>
                        {user?.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            {" "}
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
