import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider";


const PrivateRouters = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center h-[80vh] ">
             <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-green-700"></div>
        </div>
    }

    // <div className="flex justify-center items-center h-[80vh] "><span className="loading loading-spinner  loading-lg"></span></div>
    if (user) {
        return children;
    } else {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
};

export default PrivateRouters;