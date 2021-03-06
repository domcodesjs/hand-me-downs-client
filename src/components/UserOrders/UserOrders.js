import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import styled from 'styled-components';
import { API_URL } from '../../config';

const UserOrders = () => {
  const [orders, setOrders] = useState(null);
  let history = useHistory();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(`${API_URL}/orders`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JWT}`,
            Accept: 'application/json'
          }
        });
        const data = await res.json();

        return setOrders(data.orders);
      } catch (err) {
        return history.push('/');
      }
    };

    getOrders();
  }, [history]);

  const renderOrders = () => {
    return (
      <StyledMain>
        <h1>Your Orders</h1>

        <div className='orders'>
          {orders.map((order, idx) => (
            <div key={idx} className='orders-item'>
              <p>
                Ordered on {format(new Date(order.created_at), 'MMM dd, yyyy')}
              </p>
              <p>Order #{order.id}</p>
              {order.items.length > 1 ? (
                <p>{order.items.length} items</p>
              ) : (
                <p>{order.items.length} item</p>
              )}
              <button
                type='button'
                className='orders-item-btn'
                onClick={() => history.push(`/your/order/${order.id}`)}
              >
                View Order Details
              </button>
            </div>
          ))}
        </div>
      </StyledMain>
    );
  };

  return orders ? renderOrders() : null;
};

const StyledMain = styled.main`
  h1 {
    font-size: 2.2rem;
    margin-top: 1.6rem;
    padding-bottom: 0.8rem;
    border-bottom: 0.1rem solid #d8d6d5;
  }

  .orders {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  .orders-item {
    border-top: 0.1rem solid #d8d6d5;
    padding: 1.6rem 0;
  }

  .orders-item:first-child {
    margin-top: 1.6rem;
    border-top: none;
    padding-top: 0;
  }

  .orders-item-btn {
    width: 100%;
    height: 4.8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
    margin-top: 1.6rem;
  }
`;

export default UserOrders;
