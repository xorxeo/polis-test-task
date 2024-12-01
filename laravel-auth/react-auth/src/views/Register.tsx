import { FormEvent, useRef } from "react";
import { Link } from "react-router";
import axiosClient from "../AxiosClient";
import { useStateContext } from "../context/UseStateContext";

export default function Register() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const { setUser, setToken } = useStateContext();

    const Submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current!.value,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
        };
        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser!(data.user.name);
                setToken!(data.token);
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
                <h1 className="title">Create A New Account</h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="name" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
