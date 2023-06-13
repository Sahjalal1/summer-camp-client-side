import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // const [haha, setHaha] = useState(false)


    if (loading) {
        return <div className="flex justify-center mx-auto "><span className="loading loading-spinner loading-lg"></span></div>  
    }
   
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;