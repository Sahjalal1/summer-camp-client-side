import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useInstructors from "../hooks/useInstructors";


const InstructorsRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructors();
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default InstructorsRoute;