import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useInstructors = () => {
    const {user,loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email ],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/instructors/${user?.email}`);
            // console.log('rahim', res.data.admin)
            return res.data.instructor;
        }
    })
    // console.log('toma',isAdmin)
    return [isInstructor, isInstructorLoading]
}
export default useInstructors;