// student
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useStudent = () => {
    const {user,loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const {data: isStudent, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isStudent', user?.email ],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/student/${user?.email}`);
            // console.log('rahim', res.data.admin)
            return res.data.student;
        }
    })
    // console.log('toma',isAdmin)
    return [isStudent, isAdminLoading]
}
export default useStudent;