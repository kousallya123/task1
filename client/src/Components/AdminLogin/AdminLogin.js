import React, { useEffect, useState } from 'react'
import admin from '../../assets/admin.webp'
import logo from '../../assets/logo.png'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'

const KEY=process.env.REACT_APP_STRIPE;
console.log(KEY);
function AdminLogin() {
  const navigate=useNavigate()
    const [stripeToken, setStripeToken] = useState(null);
    const onToken = (token) => {
        setStripeToken(token);
      };
      useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await axios.post("http://localhost:5000/payment", {
              tokenId: stripeToken.id,
              amount: 10000,
            });
            if(res){
              navigate('/')
            }else{
              navigate('/signup')
            }
           
          } catch(error) {
            console.log(error);
          }
        };
        stripeToken && makeRequest();
      }, [stripeToken]);
  return (
    <div>
          <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Trial plan`}
              amount={10000}
              token={onToken}
              stripeKey={KEY} >
              <button>PAY NOW</button>
            </StripeCheckout>
    </div>
  )
}

export default AdminLogin
