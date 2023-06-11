// import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
console.log(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    const [axiosSecure]= useAxiosSecure()
    const params = useParams()
    console.log(params.id)

    const { data: select = [] } = useQuery(['select'], async () => {
        const res = await axiosSecure.get(`/getclass/${params?.id}`)
        return res.data;
    })

    console.log('rahim',select)

    console.log('done',select[0]?.price)
    const total = select[0]?.price;
    const price = parseFloat(total)
    return (
        <div>
            <h1>payment {params.id}</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} select={select}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;