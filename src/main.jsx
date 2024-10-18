
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import MainRouters from "./Routers/MainRouters";
import './index.css'
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Authentication/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={MainRouters} />
    </AuthProvider>
    <Toaster></Toaster>
  </React.StrictMode>
);