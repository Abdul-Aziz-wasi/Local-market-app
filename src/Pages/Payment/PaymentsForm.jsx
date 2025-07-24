import {  CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {useQuery} from '@tanstack/react-query'
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const PaymentsForm = () => {
    const stripe =useStripe();
    const elements =useElements()
    const {user}=use(AuthContext)
    const {id}=useParams()
    const navigate =useNavigate()
    console.log(id)

    const [error,setError] =useState('')


    const { data: productInfo = {}, isPending } = useQuery({
  queryKey: ['products', id],
  queryFn: async () => {
    const res = await fetch(`http://localhost:3000/products/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }
    return res.json();
  }
});
if(isPending){
    return 'loading..'
}
    console.log(productInfo)

    const latestPrice = productInfo.prices?.[productInfo.prices.length - 1]?.price;
const price = latestPrice;
console.log(price);

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


      const res = await axios.post('http://localhost:3000/create-payment-intent', {
  price: price
});
    const clientSecret =res.data.clientSecret;

    const result =await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:elements.getElement(CardElement),
            billing_details:{
                name: user.displayName, 
                email:user.eamil
            },
        },
    }) 

    if(result.error){
        setError(result.error.message)

    }else{
        setError('')
        if(result.paymentIntent.status === 'succeeded'){
            console.log('payment succeeded')
            const transactionId =result.paymentIntent.id
            const paymentData ={
                transactionId: transactionId,
                email: user?.email, 
                productId: id,
                amount: latestPrice,
                paymentMethod: result.paymentIntent.payment_method_types
            }
            const paymentRes =await axios.post("http://localhost:3000/Payments",
                paymentData);
                if(paymentRes.data.insertedId){ 
                    console.log('payment successful',paymentData)
                     Swal.fire({
        title: '🎉 Payment Successful!',
        html: `<p>Transaction ID:</p><code>${transactionId}</code>`,
        icon: 'success',
        confirmButtonText: 'Go to All Products',
      }).then(() => {
        navigate('/allproducts'); // ✅ Redirect
      });
                }

        }
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
                        Payment  ৳{latestPrice}
                    </button>
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
                   
                
            </form>
        </div>
    );
};

export default PaymentsForm;