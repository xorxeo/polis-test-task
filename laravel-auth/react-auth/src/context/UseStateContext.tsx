import { useContext } from "react";
import { ContextState } from "./Context";

export const useStateContext = () => useContext(ContextState);
