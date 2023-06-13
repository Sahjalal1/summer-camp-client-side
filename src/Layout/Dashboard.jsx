import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiTeacher, GiArchiveRegister } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { TbCircleCheck } from "react-icons/tb";
import useAdmin from "../hooks/useAdmin";
import useInstructors from "../hooks/useInstructors";
import useStudent from "../hooks/useStudent";



const Dashboard = () => {
     
    const [isStudent]= useStudent();
    const [isInstructor]= useInstructors();
    const [isAdmin] = useAdmin()
    // console.log('student', isStudent)
    // console.log('Instructors', isInstructor)
    // console.log('admin', isAdmin)

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
                        isStudent && <>
                            <li><Link to="/dashboard/selectClasses"><TbCircleCheck className="w-6 h-6"></TbCircleCheck> My Selected Classes</Link></li>
                            <li><Link to="/dashboard/enrolledclasses"><GiArchiveRegister className="w-6 h-6"></GiArchiveRegister> My Enrolled Classes</Link></li>
                            <li><Link to="/dashboard/paymenthistory"><GiArchiveRegister className="w-6 h-6"></GiArchiveRegister> PaymentHistory</Link></li>
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