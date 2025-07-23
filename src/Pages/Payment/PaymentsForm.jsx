import {  CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams } from 'react-router';

const PaymentsForm = () => {
    const stripe =useStripe();
    const elements =useElements()
    const {id}=useParams()
    console.log(id)

    const [error,setError] =useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);

        if(!card){
            return
        }
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('error',error)
            setError(error.message)
        }else{
            setError('')
            console.log('paymentMethod',paymentMethod)

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-2 border rounded'>
                     
                </CardElement>
                <button
                     className='btn bg-teal-600 text-white w-full'
                     type='submit'
                      disabled={!stripe}>
                        Payment
                    </button>
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
                   
                
            </form>
        </div>
    );
};

export default PaymentsForm;