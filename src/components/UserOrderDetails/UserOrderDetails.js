import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';

const UserOrderDetails = () => {
  const [order, setOrder] = useState(null);
  let { orderId } = useParams();
  const authState = useSelector(({ auth }) => auth);
  let history = useHistory();

  useEffect(() => {
    if (!authState.user) {
      return history.push('/login');
    }
  }, [authState.user, history]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(`http://localhost:5000/orders/${orderId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JWT}`,
            Accept: 'application/json'
          }
        });
        const data = await res.json();

        if (!data.success) {
          return history.push('/');
        }

        return setOrder(data.order);
      } catch (err) {
        return history.push('/');
      }
    };

    getOrder();
  }, [orderId, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const JWT = localStorage.getItem('jwt');
      const res = await fetch(
        `http://localhost:5000/orders/${orderId}/fulfill`,
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
        return history.push('/');
      }
    } catch (err) {
      return history.push('/');
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
        <h1>Order #{order.order_uid}</h1>
        <h2>Purchase Summary</h2>
        <p>
          Order created on {format(new Date(order.order_created), 'MM/dd/yyyy')}
        </p>

        <div className='order-shipping-info'>
          <h2>Shipping Information</h2>
          <p>{fullName}</p>
          <p>{addressOne}</p>
          {addressTwo.length ? <p>{addressTwo}</p> : null}
          <p>
            {city}, {state} {zipCode}
          </p>
        </div>

        <div className='order-items'>
          <h2>Items Ordered</h2>
          {order.order_items.map((item) => (
            <div className='order-item' key={item.uid}>
              {item.title}
            </div>
          ))}
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
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    margin: 1.6rem 0;
  }

  h2 {
    font-size: 1.8rem;
    margin: 1.6rem 0 0.8rem 0;
  }

  h3 {
    font-size: 1.6rem;
    margin-bottom: 0.8rem;

    span {
      font-size: 1.2rem;
      font-weight: 400;
    }
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
