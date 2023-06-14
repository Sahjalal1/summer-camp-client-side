import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const CheckoutForm = ({ price, select }) => {
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
            // const haha = 
            const { classId, classname, availableseats, imgURL, TotalEnrolled, instructoremail, instructorname, status, price } = select[0];
            // console.log('hahahahahah',classname,availableseats,TotalEnrolled,imgURL,instructoremail,instructorname,status,price )
            const sum = parseFloat(TotalEnrolled) + 1;
            const minus = parseFloat(availableseats) - 1;
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                cartItems: select.map(item => item._id),
                menuItems: classId,
                newstatus: 'service pending',
                itemNames: classname,
                availableseats: minus,
                TotalEnrolled: sum,
                imgURL: imgURL,
                instructoremail: instructoremail,
                instructorname: instructorname,
                status: status

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
            <form className="bg-[#f6f9fc] py-10" onSubmit={handleSubmit}>
                <div className="text-black px-10 ">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '26px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: 'black',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className="btn mt-8" type="submit" disabled={!stripe || !clientSecret || processing}>
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