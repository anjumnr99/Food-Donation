
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import MainRouters from "./Routers/MainRouters";
import './index.css'
import AuthProvider from "./Authentication/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={MainRouters} />
      </QueryClientProvider>
    </AuthProvider>
    
  </React.StrictMode>
);