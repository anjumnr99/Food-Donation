import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";


const MainRouters = createBrowserRouter([
  {
    path: "/",
    element: <div className=" text-2xl text-center mt-20">Home Page of Food Donation Platform!
    <button className="btn btn-primary">Primary</button>
    </div>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>
  },

])

export default MainRouters;