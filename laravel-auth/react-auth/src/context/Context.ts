import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../typings";

export type ContextType = {
    user: User | null;
    token: string | null;
    setUser: Dispatch<SetStateAction<User | null>> | null;
    setToken: ((token: string) => void) | null;
};

const defaultContextState: ContextType = {
    user: null,
    token: null,
    setUser: null,
    setToken: null,
};

export const ContextState = createContext(defaultContextState);
