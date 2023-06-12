import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Instructors = () => {
    // const [instructors, setInstructors] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:5000/instructors',)
    //         .then(res => res.json()).then(data => {
    //             setInstructors(data)
    //             console.log(data)
    //         })
    // }, [])
const [axiosSecure]= useAxiosSecure()
    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await axiosSecure.get('/instructors')
        return res.data;
    })

    useEffect(() => {

    }, [])


    return (
        