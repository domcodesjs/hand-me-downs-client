import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import editIcon from './images/edit-icon.svg';
import trashIcon from './images/trash-icon.svg';

const UserListings = () => {
  const [shopListings, setShopListings] = useState(null);
  const [filterSold, setFilterSold] = useState('false');
  let history = useHistory();
  const authState = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!authState.user) {
      return history.push('/login');
    }

    const getShopListings = async () => {
      const JWT = localStorage.getItem('jwt');
      const res = await fetch(`http://localhost:5000/listings/user/self`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JWT}`,
          Accept: 'application/json'
        }
      });

      const data = await res.json();

      if (!data || !data.success) {
        return history.push('/404');
      }

      return setShopListings(data.listings);
    };
    getShopListings();
  }, [authState.user, history]);

  const handleDelete = async (listingId) => {
    try {
      const JWT = localStorage.getItem('jwt');
      const res = await fetch(`http://localhost:5000/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${JWT}`,
          Accept: 'application/json'
        }
      });
      const data = await res.json();

      if (!data.success) {
        return;
      }

      return setShopListings(
        shopListings.filter((listing) => listing.uid !== data.uid)
      );
    } catch (err) {
      return history.push('/');
    }
  };

  const renderSoldListings = () => {
    const filteredListings = shopListings.filter(
      (listing) => listing.sold === true
    );

    if (!filteredListings.length) {
      return (
        <>
          <p className='no-listings'>You haven't sold anything yet!</p>
        </>
      );
    }

    return (
      <>
        <div className='shop-listings'>
          {filteredListings.map((listing) => (
            <div key={listing.uid} className='shop-item'>
              <div className='shop-item-left'>
                <img
                  src={`http://localhost:5000/uploads/images/${listing.image}`}
                  alt={listing.title}
                  onClick={() =>
                    history.push(`/listing/${listing.uid}/${listing.slug}`)
                  }
                />
                <div>
                  <h2
                    onClick={() =>
                      history.push(`/listing/${listing.uid}/${listing.slug}`)
                    }
                  >
                    {listing.title}
                  </h2>
                  <p>${listing.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderActiveListings = () => {
    const filteredListings = shopListings.filter(
      (listing) => listing.sold === false
    );

    if (!filteredListings.length) {
      return (
        <>
          <p className='no-listings'>
            You have no active listings 🙁 Click{' '}
            <Link to='/your/listings/new'>
              <span>here</span>
            </Link>{' '}
            to create one!
          </p>
        </>
      );
    }

    return (
      <>
        <div className='shop-listings'>
          {filteredListings.map((listing) => (
            <div key={listing.uid} className='shop-item'>
              <div className='shop-item-left'>
                <img
                  src={`http://localhost:5000/uploads/images/${listing.image}`}
                  alt={listing.title}
                  onClick={() =>
                    history.push(`/listing/${listing.uid}/${listing.slug}`)
                  }
                />
                <div>
                  <h2
                    onClick={() =>
                      history.push(`/listing/${listing.uid}/${listing.slug}`)
                    }
                  >
                    {listing.title}
                  </h2>
                  <p>${listing.price}</p>
                </div>
              </div>

              <div className='shop-item-right'>
                <button>
                  <img
                    src={editIcon}
                    alt='Edit'
                    onClick={() =>
                      history.push(`/your/listings/${listing.uid}/edit`)
                    }
                  />
                </button>
                <button>
                  <img
                    src={trashIcon}
                    alt='Delete'
                    onClick={() => handleDelete(listing.uid)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderShopListings = () => {
    if (!shopListings.length) {
      return (
        <StyledMain>
          <h1 className='shop-listings-title'>My Listings</h1>
          <p className='no-listings'>
            You have no listings. Click{' '}
            <Link to='/your/listings/new'>
              <span>here</span>
            </Link>{' '}
            to create one!
          </p>
        </StyledMain>
      );
    }

    return (
      <StyledMain>
        <div className='user-listings-header'>
          <h1>My Listings</h1>
          <select
            defaultValue='false'
            onChange={(e) => setFilterSold(e.target.value)}
          >
            <option value='false'>Active</option>
            <option value='true'>Sold</option>
          </select>
        </div>

        {filterSold === 'true' ? renderSoldListings() : renderActiveListings()}
      </StyledMain>
    );
  };

  return shopListings ? renderShopListings() : null;
};

const StyledMain = styled.main`
  img {
    cursor: pointer;
  }

  .no-listings {
    text-align: center;

    span {
      text-decoration: underline;
    }
  }

  .shop-listings-title {
    margin: 1.6rem 0;
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
  }

  .user-listings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.6rem 0;
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;

    h1 {
      font-size: 2.2rem;
    }
  }

  .back-btn {
    height: 2.4rem;
    width: 8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
    margin: 1.6rem 0 3.2rem 0;
  }

  .shop-listings {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1.6rem;
  }

  .shop-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    padding: 0.8rem;
    border-radius: 0.4rem;

    img {
      width: 100%;
      height: 10rem;
    }

    h2 {
      margin-top: 0.8rem;
      font-size: 1.4rem;
      font-weight: 300;
      cursor: pointer;
    }

    p {
      font-weight: 500;
    }
  }

  .shop-item-left {
    display: flex;
    align-items: center;

    img {
      width: 6.4rem;
      height: 6.4rem;
      margin-right: 1.6rem;
    }
  }

  .shop-item-right {
    display: flex;
    align-items: center;

    button:first-child {
      margin-right: 0.8rem;
      background: #0071bc;
    }

    button:last-child {
      background: #e31c3d;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.2rem;
      width: 3.2rem;
      border-radius: 0.4rem;
    }
  }
`;

export default UserListings;
