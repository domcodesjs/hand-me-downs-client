import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import styled from 'styled-components';

const CheckoutForm = () => {
  const [cardComplete, setCardComplete] = useState(false);
  const [fullName, setFullName] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!cardComplete) {
      return;
    }

    if (
      !fullName.trim().length ||
      !addressOne.trim().length ||
      !zipCode.trim().length ||
      !city.trim().length ||
      !state.trim().length
    ) {
      return;
    }

    try {
      setProcessing(true);
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      });
      const JWT = localStorage.getItem('jwt');

      const res = await fetch(
        'https://handmedowns-server.herokuapp.com/orders/charge',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JWT}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cart')),
            paymentMethod: payload.paymentMethod,
            address: {
              fullName,
              addressOne,
              addressTwo: addressTwo.trim(),
              zipCode,
              city,
              state
            }
          })
        }
      );
      const data = await res.json();

      setProcessing(false);

      if (!data.success) {
        return history.push('/');
      }

      localStorage.setItem('cart', JSON.stringify([]));
      return history.push(`/your/purchase/${data.purchase.uid}`);
    } catch (err) {
      setProcessing(false);
      return history.push('/');
    }
  };

  return (
    <StyledForm className='FormGroup' onSubmit={handleSubmit}>
      <h3>Shipping Address</h3>
      <label htmlFor='fullName'>Full Name</label>
      <input
        type='text'
        id='fullName'
        onChange={(e) => setFullName(e.target.value)}
      />

      <label htmlFor='addressOne'>Address One</label>
      <input
        type='text'
        id='addressOne'
        onChange={(e) => setAddressOne(e.target.value)}
      />

      <label htmlFor='addressTwo'>Address Two (optional)</label>
      <input
        type='text'
        id='addressTwo'
        onChange={(e) => setAddressTwo(e.target.value)}
      />

      <label htmlFor='city'>City</label>
      <input type='text' id='city' onChange={(e) => setCity(e.target.value)} />

      <label htmlFor='state'>State</label>
      <input
        type='text'
        id='state'
        onChange={(e) => setState(e.target.value)}
      />

      <label htmlFor='zipCode'>Zip Code</label>
      <input
        type='text'
        id='zipCode'
        onChange={(e) => setZipCode(e.target.value)}
      />
      <h3>Payment Details</h3>
      <CardElement
        onChange={(e) => setCardComplete(e.complete)}
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4'
              }
            },
            invalid: {
              color: '#9e2146'
            }
          }
        }}
      />
      {processing ? (
        <button type='button' disabled>
          Processing...
        </button>
      ) : (
        <button type='submit'>Complete Checkout</button>
      )}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 0.8rem;
  }

  label {
    margin-bottom: 0.8rem;
  }

  input {
    margin-bottom: 1.6rem;
    height: 4.8rem;
    border-radius: 0.4rem;
    padding-left: 0.8rem;
    border: 1px solid black;
  }

  button {
    margin-top: 1.6rem;
    height: 4.8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
  }
`;

export default CheckoutForm;
