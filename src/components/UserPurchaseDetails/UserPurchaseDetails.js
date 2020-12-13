import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

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
        const res = await fetch(
          `https://handmedowns-server.herokuapp.com/purchases/${purchaseId}`,
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

        return setPurchase(data.purchase);
      } catch (err) {
        return history.push('/');
      }
    };

    getPurchase();
  }, [history, purchaseId]);

  const renderPurchasedItems = (items) => {
    const accumulator = [];

    for (let key in items) {
      accumulator.push(
        <>
          <Link to={`/shop/${key}`}>
            <h3>
              {key} <span>({items[key]['orderStatus']})</span>
            </h3>
          </Link>
          {items[key]['items'].map((item, idx) => (
            <div className='purchase-item' key={idx}>
              <Link to={`/listing/${item.uid}/${item.slug}`}>
                <img
                  src={`https://handmedowns-server.herokuapp.com/uploads/images/${item.image}`}
                  alt=''
                />
              </Link>
              <p>
                <Link to={`/listing/${item.uid}/${item.slug}`}>
                  {item.title.length > 21
                    ? item.title.substring(0, 18) + '...'
                    : item.title}
                </Link>
              </p>
              <p>${item.price}</p>
            </div>
          ))}
        </>
      );
    }
    return accumulator;
  };

  const renderPurchase = () => {
    const {
      purchases_created: createdAt,
      purchases_items: items,
      purchases_shipping_address: shippingAddress,
      purchases_uid: uid,
      purchases_total: total
    } = purchase;

    return (
      <StyledMain>
        <h1>Purchase #{uid}</h1>
        <h2>Purchase Summary</h2>
        <p>Purchased on {format(new Date(createdAt), 'MM/dd/yyyy')}</p>
        <div className='purchase-shipping-info'>
          <h2>Shipping Information</h2>
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.addressOne}</p>
          {shippingAddress.addressTwo.length ? (
            <p>{shippingAddress.addressTwo}</p>
          ) : null}
          <p>
            {shippingAddress.city}, {shippingAddress.state}{' '}
            {shippingAddress.zipCode}
          </p>
        </div>
        <div className='purchased-items'>
          <h2>Items Purchased</h2>
          {renderPurchasedItems(items).map((item, idx) => {
            return <div key={idx}>{item}</div>;
          })}
        </div>

        <div className='purchase-billing-info'>
          <h2>Billing Information</h2>
          <p>Total ${total}</p>
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
