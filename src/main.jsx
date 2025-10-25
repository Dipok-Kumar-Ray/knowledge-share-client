import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/router";
import AuthProvider from "./contexts/AuthProvider";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);