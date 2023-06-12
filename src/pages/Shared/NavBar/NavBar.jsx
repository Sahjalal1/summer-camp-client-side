import { NavLink } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";


const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [theme, setTheme]=useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")

    useEffect(()=>{
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme)
    },[theme])

const handleToggle =(e)=>{
    if(e.target.checked){
        setTheme("dark");
    }
    else{
        setTheme("light");
    }
}

    const handleLogOut = () => {
        logOut()
    }

    const nevItem = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/instructors'>Instructors</NavLink></li>
        <li><NavLink to='/classes'>Classes</NavLink></li>
        <li><NavLink to='/dashboard/'>Dashboard</NavLink></li>
        <label className="swap swap-rotate">

            <input type="checkbox" onChange={handleToggle} />

            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

        </label>
    </>

    return (
        <div className="navbar w-[100%] lg:w-[80%] mx-auto pr-5 lg:pl-8 lg:pr-14 bg-error text-white shadow-2xl mb-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black font-bold">
                        {nevItem}
                    </ul>
                </div>

                <img className="w-10 lg:w-20 " src="data:image/png;base64,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" alt="" />
                <a className="btn btn-ghost normal-case text-xl">Instrument</a>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-xl px-1">
                    {nevItem}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && <div className="w-10 rounded-full">
                        <img src={user?.photoURL} />
                    </div>
                }
                {
                    user ? <NavLink className="text-xl" onClick={handleLogOut} >LogOut</NavLink>
                        : <NavLink className="text-xl" to='/login'>Login</NavLink>
                }
            </div>
        </div>

    );
};

export default NavBar;