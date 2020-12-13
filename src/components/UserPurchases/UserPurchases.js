import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import styled from 'styled-components';

const UserPurchases = () => {
  const [purchases, setPurchases] = useState(null);
  const authState = useSelector(({ auth }) => auth);

  let history = useHistory();
  useEffect(() => {
    if (!authState.user) {
      return history.push('/login');
    }

    const getPurchases = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(
          `https://handmedowns-server.herokuapp.com/purchases`,
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

        return setPurchases(data.purchases);
      } catch (err) {
        return history.push('/');
      }
    };

    getPurchases();
  }, [authState.user, history]);

  const numberOfItemsOrder = (items) => {
    let count = 0;
    for (let key in items) {
      count += items[key]['items'].length;
    }

    return count > 1 ? <p>{count} items</p> : <p>{count} item</p>;
  };

  const renderPurchases = () => {
    return (
      <StyledMain>
        <h1>Your Purchases</h1>

        <div className='purchases'>
          {purchases.map((purchase, idx) => (
            <div key={idx} className='purchases-item'>
              <p>
                Purchased on{' '}
                {format(new Date(purchase.purchases_created), 'MMM dd, yyyy')}
              </p>
              <p>Purchase #{purchase.purchases_uid}</p>
              {numberOfItemsOrder(purchase.purchases_items)}
              <button
                type='button'
                className='purchases-item-btn'
                onClick={() =>
                  history.push(`/your/purchase/${purchase.purchases_uid}`)
                }
              >
                View Order Details
              </button>
            </div>
          ))}
        </div>
      </StyledMain>
    );
  };

  return purchases ? renderPurchases() : null;
};

const StyledMain = styled.main`
  h1 {
    font-size: 2.2rem;
    margin-top: 1.6rem;
    padding-bottom: 0.8rem;
    border-bottom: 0.1rem solid #d8d6d5;
  }

  .purchases {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  .purchases-item {
    border-top: 0.1rem solid #d8d6d5;
    padding: 1.6rem 0;
  }

  .purchases-item:first-child {
    margin-top: 1.6rem;
    border-top: none;
    padding-top: 0;
  }

  .purchases-item-btn {
    width: 100%;
    height: 4.8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
    margin: 1.6rem 0;
  }
`;

export default UserPurchases;
