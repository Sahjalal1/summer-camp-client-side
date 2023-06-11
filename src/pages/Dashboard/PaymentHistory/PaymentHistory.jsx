// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: paymenthistory = [] } = useQuery(['paymenthistory'], async () => {
        const res = await axiosSecure.get('/enrolledClasses')
        return res.data;
    })
    console.log(paymenthistory)
    return (
        <div>
            <div className="w-[300px] lg:w-[350px] mx-auto">
                <h1 className="text-center text-4xl my-16 leading-tight border-x-4 border-error">
                    Pa<span className="text-error font-serif">m</span>ent He<span className="text-error font-serif">is</span>tory</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-[90%] mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-sm">Transaction Id</th>
                            <th className="text-sm">Price</th>
                            <th className="text-sm">Date</th>
                            <th className="text-sm">Email</th>
                            <th className="text-sm">Course Name</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            paymenthistory?.map((payment,index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <th className="text-sm text-green-500">{payment.transactionId}</th>
                                <th className="text-sm text-red-500">{payment.price}</th>
                                <th className="text-sm text-red-500">{payment.date}</th>
                                <th className="text-sm ">{payment.email}</th>
                                <th className="text-sm ">{payment.itemNames}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;