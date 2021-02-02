import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../../config';

const UserPurchaseDetails = () => {
  const [purchase, setPurchase] = useState(null);
  const { purchaseId } = useParams();
  const authState = useSelector(({ auth }) => auth);
  const history = useHistory();

  useEffect(() => {
    if (!authState.user) {
      return history.push('/login');
    }
  }, [authState.user, history]);

  useEffect(() => {
    const getPurchase = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(`${API_URL}/purchases/${purchaseId}`, {
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
        console.log(data);
        return setPurchase(data.purchase);
      } catch (err) {
        return history.push('/');
      }
    };

    getPurchase();
  }, [history, purchaseId]);

  const renderPurchasedItems = (orders) => {
    return orders.map((order, idx) => (
      <div key={idx}>
        <h3>{order.seller.username}</h3>
        <h4>Order Status: {order.shipped ? 'Shipped' : 'Processing'}</h4>
        {order.items.map((item, idx) => (
          <div className='purchase-item' key={idx}>
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
            <p>${(item.price / 100).toFixed(2)}</p>
          </div>
        ))}
      </div>
    ));
  };

  const renderPurchase = () => {
    const { created_at, orders, shipping_address, id, total } = purchase;

    return (
      <StyledMain>
        <h1>Purchase #{id}</h1>
        <h2>Purchase Summary</h2>
        <p>Purchased on {format(new Date(created_at), 'MM/dd/yyyy')}</p>
        <div className='purchase-shipping-info'>
          <h2>Shipping Information</h2>
          <p>{shipping_address.fullName}</p>
          <p>{shipping_address.addressOne}</p>
          {shipping_address.addressTwo.length ? (
            <p>{shipping_address.addressTwo}</p>
          ) : null}
          <p>
            {shipping_address.city}, {shipping_address.state}{' '}
            {shipping_address.zipCode}
          </p>
        </div>
        <div className='purchased-items'>
          <h2>Items Purchased</h2>
          {renderPurchasedItems(orders)}
        </div>

        <div className='purchase-billing-info'>
          <h2>Billing Information</h2>
          <p>Total ${(total / 100).toFixed(2)}</p>
        </div>
      </StyledMain>
    );
  };

  return purchase ? renderPurchase() : null;
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

  .purchase-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.8rem;

    img {
      width: 50px;
    }
  }

  @media (min-width: 576px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
  }

  @media (min-width: 1200px) {
  }
`;

export default UserPurchaseDetails;
