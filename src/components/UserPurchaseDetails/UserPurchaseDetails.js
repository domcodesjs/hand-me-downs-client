import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { verifyJWT } from '../../store/actions/authActions';

const UserPurchaseDetails = () => {
  const [purchase, setPurchase] = useState(null);
  const { purchaseId } = useParams();
  const authState = useSelector(({ auth }) => auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const checkJWT = useCallback(() => dispatch(verifyJWT()), [dispatch]);

  useEffect(() => {
    if (!authState.user) {
      if (localStorage.getItem('jwt')) {
        return checkJWT();
      }

      return history.push('/login');
    }
  }, [authState.user, checkJWT, history]);

  useEffect(() => {
    const getPurchase = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(
          `http://localhost:5000/purchases/${purchaseId}`,
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
        return setPurchase(data.purchase);
      } catch (err) {
        console.log(err);
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
            <h4>{key}</h4>
          </Link>

          <p>Status {items[key]['orderStatus']}</p>
          {items[key]['items'].map((item, idx) => (
            <div className='purchase-item' key={idx}>
              <Link to={`/listing/${item.uid}/${item.slug}`}>
                <img
                  src={`http://localhost:5000/uploads/images/${item.image}`}
                  alt=''
                />
              </Link>
              <p>
                <Link to={`/listing/${item.uid}/${item.slug}`}>
                  {item.title}
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
        <p>Purchase #{uid}</p>
        <p>Purchased on {format(new Date(createdAt), 'MM/dd/yyyy')}</p>
        <div className='purchase-shipping-info'>
          <h3>Shipping Information</h3>
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.addressOne}</p>
          <p>{shippingAddress.city}</p>
          <p>{shippingAddress.state}</p>
          <p>{shippingAddress.zipCode}</p>
        </div>
        <div className='purchased-items'>
          <h3>Purchase Summary</h3>
          {renderPurchasedItems(items).map((item, idx) => {
            return <div key={idx}>{item}</div>;
          })}
        </div>

        <div className='purchase-billing-info'>
          <h3>Billing Information</h3>
          <p>Total ${total}</p>
        </div>
      </StyledMain>
    );
  };

  return purchase ? renderPurchase() : null;
};

const StyledMain = styled.main`
  .purchase-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 50px;
    }
  }
`;

export default UserPurchaseDetails;
