import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const UserOrderDetails = () => {
  const [order, setOrder] = useState(null);
  let { orderId } = useParams();
  let history = useHistory();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(
          `https://secure-citadel-31026.herokuapp.com/orders/${orderId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JWT}`,
              Accept: 'application/json'
            }
          }
        );
        const data = await res.json();

        if (!data.success) {
          return history.push('/');
        }

        console.log(data);
        return setOrder(data.order);
      } catch (err) {
        console.log(err);
      }
    };

    getOrder();
  }, [orderId, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const JWT = localStorage.getItem('jwt');
      const res = await fetch(
        `https://secure-citadel-31026.herokuapp.com/orders/${orderId}/fulfill`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JWT}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await res.json();

      if (!data.success) {
        console.log(':(');
        return;
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderOrder = () => {
    const {
      fullName,
      addressOne,
      addressTwo,
      city,
      state,
      zipCode
    } = order.order_shipping_address;
    return (
      <>
        <h1>Order # {order.order_uid}</h1>
        <p>Order created {}</p>
        <div className='order-items'>
          <h2>Items Ordered</h2>
          {order.order_items.map((item) => (
            <div className='order-item' key={item.uid}>
              {item.title}
            </div>
          ))}
        </div>
        <div className='order-shipping-info'>
          <h2>Shipping Information</h2>
          <p>{fullName}</p>
          <p>{addressOne}</p>
          {addressTwo.length ? <p>{addressTwo}</p> : null}
          <p>
            {city}, {state} {zipCode}
          </p>
        </div>
        <div className='order-status'>
          <h2>Order Status</h2>
          <p>{order.order_status}</p>
        </div>

        <form onSubmit={handleSubmit} className='order-change-form'>
          <button type='submit'>Fulfill Order</button>
        </form>
      </>
    );
  };

  return order ? <StyledMain>{renderOrder()}</StyledMain> : null;
};

const StyledMain = styled.main`
  h1 {
    font-size: 1.6rem;
  }

  .order-items {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  .order-change-form {
    display: flex;
    flex-direction: column;
  }

  input {
    height: 4.8rem;
    border-radius: 0.4rem;
    border: 0.1rem solid black;
    padding-left: 0.8rem;
    margin-bottom: 1.6rem;
  }

  label {
    margin-bottom: 0.8rem;
  }

  button {
    width: 100%;
    height: 4.8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
  }
`;

export default UserOrderDetails;
