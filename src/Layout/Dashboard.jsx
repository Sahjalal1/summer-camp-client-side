import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiTeacher, GiArchiveRegister } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { TbCircleCheck } from "react-icons/tb";
// import useAdmin from "../hooks/useAdmin";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
// import useAxiosSecure from "../hooks/useAxiosSecure";







const Dashboard = () => {
    const { user } = useContext(AuthContext)
    // const [axiosSecure]= useAxiosSecure()
    const token = localStorage.getItem('access-token')
    const [isAdmina, setIsAdmin] = useState(false);

    useEffect(() => {

        fetch(`http://localhost:5000/user/admin/${user?.email}`, {
            headers: { authorization: `bearer ${token}` }
        })
            .then(res => res.json()).then(data => {
                if (data === true) {
                    console.log('hahahahha',data)
                    setIsAdmin(data)
                }
                else(
                    console.log('error', data)
                )
            })

    }, [user, token])

    console.log(isAdmina)
    const isUsers = false;
    const isInstructor = false;
    const isAdmin = true;
    // const [isAdmin] = useAdmin()
    // console.log(isAdmin)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}

                    {
                        isUsers && <>
                            <li><Link to="/dashboard/selectClasses"><TbCircleCheck className="w-6 h-6"></TbCircleCheck> My Selected Classes</Link></li>
                            <li><Link><GiArchiveRegister className="w-6 h-6"></GiArchiveRegister> My Enrolled Classes</Link></li>
                        </>
                    }
                    {
                        isInstructor && <>
                            <li><Link to="/dashboard/addclasses"> Add a Class</Link></li>
                            <li><Link to="/dashboard/myclasses"> My Classes</Link></li>
                        </>
                    }
                    {
                        isAdmin && <>
                            <li><Link to="/dashboard/manageclasses">Manage Classes</Link></li>
                            <li><Link to="/dashboard/manageusers">Manage Users</Link></li>
                        </>
                    }
                    <div className="divider">OR</div>

                    <li><Link to="/"><FaHome className="w-6 h-6"></FaHome> Home</Link></li>
                    <li><Link to="/instructors"><GiTeacher className="w-6 h-6"></GiTeacher> Instructor</Link></li>
                    <li><Link to="/classes"><SiGoogleclassroom className="w-6 h-6"></SiGoogleclassroom> Classes</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;