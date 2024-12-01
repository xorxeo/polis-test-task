import { FormEvent, useRef } from "react";
import { Link } from "react-router";
import axiosClient from "../AxiosClient";
import { useStateContext } from "../context/UseStateContext";

export default function Login() {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const { setUser, setToken } = useStateContext();

    const Submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser!(data.user);
                setToken!(data.access_token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Login To Your Account</h1>
                <form onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/register">Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
