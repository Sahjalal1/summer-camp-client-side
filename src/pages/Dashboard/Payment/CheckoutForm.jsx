// import React from 'react';

import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
// import { set } from "react-hook-form";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements()
    const { user } = useContext(AuthContext)
    const [cardError, setCardEroor] = useState('');
    const [clientSecret, setClientSecret] = useState('');
 
    console.log(clientSecret)

    useEffect(() => {
        const rahim = '50'
        fetch('http://localhost:5000/create-payment-intent', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(rahim)
        }).then(res => res.json()).then(data => {
            console.log(data)
            setClientSecret(data)
        })
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return 
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return 
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(error);
            setCardEroor(error.message)
        }
        else {
            setCardEroor('')
            console.log("payment method", paymentMethod)
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous"
                    }
                }
            }
        );

        if(confirmError){
            console.log("confirmError",confirmError)
        }
        console.log("paymentIntent",paymentIntent)

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className="ml-8 text-3xl text-red-600">{cardError}</p>
            }
        </>
    );
};

export default CheckoutForm;