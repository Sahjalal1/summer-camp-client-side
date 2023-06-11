import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import  "./CheckoutForm.css"


const CheckoutForm = ({ price, select}) => {
    const stripe = useStripe();
    const elements = useElements()
    const { user } = useContext(AuthContext)
    const [cardError, setCardEroor] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [axiosSecure] = useAxiosSecure()
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    // console.log(clientSecret)
console.log('fjdsklfjsdlkjfsd', select)
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(error);
            setCardEroor(error.message)
        }
        else {
            setCardEroor('')
            // console.log("payment method", paymentMethod)
        }

        setProcessing(true)

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

        if (confirmError) {
            console.log("confirmError", confirmError)
        }
        console.log("paymentIntent", paymentIntent)

        setProcessing(false)

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                cartItems: select.map(item => item._id),
                menuItems: select.map(item => item.classId),
                status: 'service pending',
                itemNames: select.map(item => item.classname),
                availableseats: select.map(item => item.availableseats),
                TotalEnrolled: select.map(item => item.TotalEnrolled)

            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.result.insertedId) {
                        // display confirm
                    }
                })
        }
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
                <button className="btn" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className="ml-8 text-3xl text-red-600">{cardError}</p>
            }
            {
                transactionId && <p className="text-green-500">Transaction Complet With TransactionId: {transactionId}</p>
            }
        </>
    );
};

export default CheckoutForm;