import { useState, FC } from "react";
import { User } from "../typings";
import { ContextState } from "./Context";

type ContextProviderProps = {
    children: JSX.Element;
};

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [tokenState, setTokenState] = useState(localStorage.getItem("ACCESS_TOKEN"));
    // const [tokenState, setTokenState] = useState("123");

    const setToken = (token: string) => {
        setTokenState(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <ContextState.Provider
            value={{ user, setUser, token: tokenState, setToken }}
        >
            {children}
        </ContextState.Provider>
    );
};