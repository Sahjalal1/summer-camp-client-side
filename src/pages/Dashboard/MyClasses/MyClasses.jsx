// import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyClasses = () => {
    const { user } = useContext(AuthContext)


    const [axiosSecure] = useAxiosSecure()

    const { data: myclasses = [] } = useQuery(['myclasses'], async () => {
        const res = await axiosSecure.get(`/myclasses/${user?.email}`)
        return res.data;
    })

console.log(myclasses.imgURL)
    return (
        <div>
            <div className="w-[300px] mx-auto">
                <h1 className="text-center text-4xl my-16 border-x-4 border-error">M<span className="text-error">y</span> Cla<span className="text-error">ss</span>es</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {
                    myclasses?.map(myclass => <div key={myclass._id} className="w-[90%] mx-auto lg:w-[400px] shadow-2xl rounded-lg">
                        <figure><img  className="w-full h-[250px]" src={myclass?.imgURL} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">TotalEnrolled : {myclass?.TotalEnrolled}</h2>
                            <h2 className="card-title">status : <span className="border-b-2 border-black text-error">{myclass?.status}</span></h2>
                            {/* <p>{}</p> */}
                            <div className="card-actions">
                                <h1 className="text-xl">FeedBack: </h1>
                                <p className="xl border-b-2">{myclass.feedback}</p>
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