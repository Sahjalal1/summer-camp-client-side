// import React from 'react';
// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageUsers = () => {
    const [axiosSecure]=useAxiosSecure()

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })


    const handleMakeAdmin = (user) => {
        console.log(user._id)
        fetch(`https://summer-sarver-mdsahjalalrahim-gmailcom.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                      }) 
                }
            })
    }

    const handleMakeinstructor = user => {
        console.log(user._id)
        fetch(`https://summer-sarver-mdsahjalalrahim-gmailcom.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {           
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                      }) 
                }
            })
    }

    return (
        <div>
            <h1>{users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-[90%] mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="text-2xl font-bold text-error">
                                    {
                                        user?.role === 'admin' || user?.role === 'instructor' ? <p>{user?.role}</p> : <p>{user?.role}</p>
                                    }
                                </td>
                                <td>
                                    {
                                        user?.role === 'admin' || user?.role === 'instructor' 
                                        ? <button disabled className="py-2 px-4 text-lg disabled:disabled disabled:opacity-75 disabled:bg-slate-500 border-2 rounded-md">Instructor</button>
                                        : <button onClick={() => handleMakeinstructor(user)} className="py-2 px-4 border-2 text-lg rounded-md btn-outline btn-error">Instructor</button>
                                    }
                                </td> 
                                <td>
                                    {
                                        user?.role === 'admin' || user?.role === 'instructor' 
                                        ? <button disabled className="py-2 px-4 text-lg disabled:disabled disabled:opacity-75 disabled:bg-slate-500 border-2 rounded-md">admin</button>
                                        : <button onClick={() => handleMakeAdmin(user)} className="py-2 px-4 border-2 text-lg rounded-md btn-outline btn-error">admin</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;