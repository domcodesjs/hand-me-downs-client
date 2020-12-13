import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import CheckoutForm from './CheckoutForm';

const Checkout = () => {
  const stripePromise = loadStripe('pk_mK6RBGmHBKST7pg3m0rwtS6BMCfOH');
  let history = useHistory();
  const authState = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!authState.user) {
      return history.push('/login');
    }
  }, [authState.user, history]);

  return (
    <StyledMain>
      <h1>Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  h1 {
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    margin: 1.6rem 0;
  }
`;

export default Checkout;
