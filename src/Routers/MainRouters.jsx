import { createBrowserRouter } from "react-router-dom";


const MainRouters = createBrowserRouter([
  {
    path: "/",
    element: <div className=" text-2xl text-center  mt-20">This is the Home Page!</div>
  }
])

export default MainRouters;