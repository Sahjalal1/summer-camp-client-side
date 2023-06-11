// import React from 'react';

// import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageClasses = () => {
    // const [allClass, setAllClass] = useState([]);
    // const [feedback, setFeedback] = useState('')
    // const [par, setPar] = useState([])


    // useEffect(() => {
    //     fetch('http://localhost:5000/classes',{
    //         headers: 
    //     }).then(res => res.json()).then(data => {
    //         setAllClass(data)
    //         console.log(data)
    //     })
    // }, [par])

    const [axiosSecure]= useAxiosSecure()

    const { data: allClass = [] } = useQuery(['allClass'], async () => {
        const res = await axiosSecure.get('/classes')
        return res.data;
    })

    const handelClasses = (classes, setStatus) => {
        console.log(classes._id)
        const { _id, classname, imgURL, instructorname, instructoremail, availableseats, price, TotalEnrolled, status } = classes;
        const update = { classname, imgURL, instructorname, instructoremail, availableseats, price, TotalEnrolled, status: setStatus }

        fetch(`http://localhost:5000/updatestatus/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                // setAm(data)
                console.log(data);
                // setPar(data)
            })

    }
    // Swal.fire({
    //     title: 'Do you want to save the changes?',
    //     showDenyButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: 'Save',
    //     denyButtonText: `Don't save`,
    // }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {

    //         Swal.fire('Update!', '', 'success')
    //     }
    //     else if (result.isDenied) {

    //         Swal.fire('Changes are not Update', '', 'info')
    //         return;
    //     }
    // })


    const handelChange = event => {
        event.preventDefault();
        const data = event.target.value
        // setFeedback(data)
    }

    const handelSubmit = () => {
        // console.log(feedback)
    }



    return (
        <>
            <div className="w-[90%] mx-auto mb-10">
                <div className="w-[300px] mx-auto">
                    <h1 className="text-center text-4xl my-16 border-x-4 border-error">M<span className="text-error">a</span>nage Cla<span className="text-error">ss</span>es</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        allClass?.map(classa => <div key={classa._id}
                            className="w-[400px] shadow-2xl rounded-lg">
                            <img src={classa?.imgURL} alt="Shoes" />
                            <div className="card-body">
                                <h2 className="card-title">Class Name : <span className="border-b-2 border-black">{classa?.instructoremail}</span>!</h2>

                                <h1 className="font-sebold my-4">Instructor Name : <span className=" border-b-2 border-black">{classa?.instructorname}</span></h1>
                                <h1 className="font-sebold">Instructor Name : <span className="border-b-2 border-black">{classa?.instructoremail}</span></h1>
                                <div className="flex justify-between my-2">
                                    <h2>AvailableSeats : <span className="font-bold text-error">{classa?.availableseats}</span></h2>
                                    <h2>Price : <span className="font-bold text-error">{classa?.price}</span></h2>
                                </div>
                                <h1 className="mb-4">Status : <span className="text-error text-xl">{classa?.status}</span></h1>
                                <div className="card-actions mx-auto">
                                    {
                                        classa?.status === 'approve' || classa?.status === 'denied' ? <button disabled  className="py-3 px-4 disabled:disabled disabled:opacity-75 disabled:bg-slate-500 border-2 rounded-md ">Approve</button>
                                            : <button onClick={() => handelClasses(classa, "approve")} className="py-3 px-4 border-2 rounded-md btn-outline btn-error">Approve</button>
                                    }
                                    {
                                        classa?.status === 'approve' || classa?.status === 'denied' ? <button disabled className="py-3 px-4 disabled:disabled disabled:opacity-75 disabled:bg-slate-500 border-2 rounded-md ">denied</button>
                                            : <button onClick={() => handelClasses(classa, "denied")} className="py-3 px-4 border-2 rounded-md btn-outline btn-error">denied</button>
                                    }
                                    <button onClick={() => window.my_modal_1.showModal()} className="py-3 px-4 border-2 rounded-md btn-outline btn-error">feedback</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>

            {/*--------------- This is modal --------------------------------------------*/}
            <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <textarea onChange={handelChange} placeholder="Bio" name="feedback" className="textarea  textarea-error textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                    <div className="mt-5">
                        <button onClick={handelSubmit} className="py-3 px-4 border-2 rounded-md btn-outline btn-error">Submit</button>
                    </div>
                </form>

            </dialog>
        </>
    );
};

export default ManageClasses;