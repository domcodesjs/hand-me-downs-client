import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';
import { API_URL } from '../../config';

const UserOrderDetails = () => {
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  let { orderId } = useParams();
  const authState = useSelector(({ auth }) => auth);
  let history = useHistory();

  useEffect(() => {
    if (!authState.user) {
      return history.push('/login');
    }

    const getOrder = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(`${API_URL}/orders/${orderId}`, {
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
  }, [orderId, authState.user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      const JWT = localStorage.getItem('jwt');
      const res = await fetch(`${API_URL}/orders/${orderId}/fulfill`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JWT}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (!data.success) {
        return setError('Could not fulfill order. Please try again.');
      }

      return setOrder(data.order);
    } catch (err) {
      return setError('Could not fulfill order. Please try again.');
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
    } = order.shipping_address;
    return (
      <>
        <h1>Order #{order.id}</h1>
        {error ? (
          <StyledError>
            <p>
              {error}
              <span onClick={() => setError(null)}>X</span>
            </p>
          </StyledError>
        ) : null}
        <h2>Purchase Summary</h2>
        <p>
          Order created on {format(new Date(order.created_at), 'MM/dd/yyyy')}
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

        <div>
          <h2>Items Ordered</h2>
          {order.items.map((item, idx) => (
            <div className='order-item' key={idx}>
              <Link to={`/listing/${item.id}/${item.slug}`}>
                <img src={`${API_URL}/uploads/images/${item.image}`} alt='' />
              </Link>
              <p>
                <Link to={`/listing/${item.id}/${item.slug}`}>
                  {item.title.length > 21
                    ? item.title.substring(0, 18) + '...'
                    : item.title}
                </Link>
              </p>
              <p>${item.price / 100}</p>
            </div>
          ))}
        </div>

        <div className='order-status'>
          <h2>Order Status</h2>
          <p>{order.shipped ? 'Fulfilled' : 'Not Fulfilled'}</p>
        </div>
        {!order.shipped ? (
          <form onSubmit={handleSubmit} className='order-change-form'>
            <button type='submit'>Fulfill Order</button>
          </form>
        ) : null}
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

  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.8rem;

    img {
      width: 50px;
    }
  }

  .order-change-form {
    display: flex;
    flex-direction: column;
    margin-top: 1.6rem;
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

const StyledError = styled.div`
  p {
    background: #e31c3d;
    color: #fff;
    border-radius: 0.4rem;
    padding: 0.8rem;
    margin-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 700;
      cursor: pointer;
    }
  }

  p:last-child {
    margin-bottom: 1.6rem;
  }
`;

export default UserOrderDetails;
