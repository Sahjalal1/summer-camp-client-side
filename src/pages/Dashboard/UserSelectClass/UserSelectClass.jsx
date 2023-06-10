import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const UserSelectClass = () => {
    const [selectClasses , setSelectClasses]= useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/addclass').then(res=>res.json()).then(data=> setSelectClasses(data))
    },[])

    return (
        <div>
            <h2>{selectClasses.length}</h2>
            <Link to="/dashboard/payment"><button className="py-3 px-5 bg-black text-white">payment</button></Link>
        </div>
    );
};

export default UserSelectClass;