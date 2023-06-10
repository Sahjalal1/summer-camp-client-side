// import React from 'react';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const MyClasses = () => {
    const { user } = useContext(AuthContext)
    const [myclasses, setMyclasses] = useState([])
    const [log, setLog] = useState(true)


    useEffect(() => {
        
        fetch(`http://localhost:5000/myclasses/${user?.email}`)
            .then(res => res.json()).then(data => {
                setMyclasses(data)
                setLog(false)
                console.log(data)
            })
    }, [user])


    return (
        <div>
            {
                log && <p className="text-4xl">rahim</p>
            }
            <div className="w-[300px] mx-auto">
                    <h1 className="text-center text-4xl my-16 border-x-4 border-error">M<span className="text-error">y</span> Cla<span className="text-error">ss</span>es</h1>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {
                    myclasses?.map(myclass => <div key={myclass._id} className="w-[90%] mx-auto lg:w-[400px] shadow-2xl rounded-lg">
                        <figure><img src={myclass.imgURL} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">TotalEnrolled : {myclass?.TotalEnrolled}</h2>
                            <h2 className="card-title">status : <span className="border-b-2 border-black text-error">{myclass?.status}</span></h2>
                            {/* <p>{}</p> */}
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className="divider bg-error my-20"></div>
        </div>
    );
};

export default MyClasses;