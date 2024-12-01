import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";

import { RouterProvider } from "react-router";
import Router from "./routing/router.tsx";
import { ContextProvider } from "./context/ContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={Router}></RouterProvider>
        </ContextProvider>
    </StrictMode>
);
