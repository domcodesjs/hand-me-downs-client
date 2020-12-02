import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const Checkout = () => {
  const stripePromise = loadStripe('pk_mK6RBGmHBKST7pg3m0rwtS6BMCfOH');

  return (
    <main>
      <h1>Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </main>
  );
};

export default Checkout;
