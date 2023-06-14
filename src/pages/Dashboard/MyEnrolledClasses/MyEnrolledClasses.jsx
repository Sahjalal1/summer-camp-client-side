// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const MyEnrolledClasses = () => {
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();

    const { data: EnrolledClass = [] } = useQuery(['EnrolledClass'], async () => {
        const res = await axiosSecure.get(`/enrolledClasses/${user?.email}`)
        return res.data;
    })
    console.log(EnrolledClass)
    return (
        <div className="mb-20 ">
            <div className="w-[300px] lg:w-[350px] mx-auto">
                <h1 className="text-center text-4xl my-16 leading-tight border-x-4 border-error">
                    M<span className="text-error font-serif">y</span> En<span className="text-error font-serif">rol</span>led
                    Cl<span className="text-error font-serif">ass</span>es</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                  EnrolledClass.length === 0 ? <p className="text-2xl text-center text-error">No enrolled Class</p>  : EnrolledClass?.map(enrolled => <div key={enrolled._id} className="w-[90%] mx-auto lg:w-[400px] shadow-2xl rounded-lg">
                        <figure><img  className="w-full h-[250px]" src={enrolled?.imgURL} alt="Shoes" /></figure>
                        <div className="card-body">
                            <p className="card-title">Classes Name : {enrolled?.itemNames}</p>
                            <p className="">TotalEnrolled : {enrolled?.TotalEnrolled}</p>
                            <h2 className="">status : <span className="border-b-2 border-black text-error">{enrolled?.status}</span></h2>
                            <p><span className="font-semibold">You Pay</span><span className="text-error"> ${enrolled?.price}</span></p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Details</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyEnrolledClasses;