import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Shop = () => {
  const [shopListings, setShopListings] = useState(null);
  let { username } = useParams();
  let history = useHistory();

  useEffect(() => {
    const getShopListings = async () => {
      const res = await fetch(
        `http://localhost:5000/listings/shop/${username}`
      );
      const data = await res.json();

      if (!data || !data.success) {
        return history.push('/404');
      }

      return setShopListings(data.listings);
    };
    getShopListings();
  }, [username, history]);

  const renderShopListings = () => {
    if (!shopListings.length) {
      return (
        <div>
          <h1>{username.trimEnd().toLowerCase()}</h1>
          <p>This user has no items for sale.</p>
        </div>
      );
    }

    return (
      <StyledMain>
        <button className='back-btn' onClick={() => history.goBack()}>
          Back
        </button>

        <div>
          <h1>{username.trimEnd().toLowerCase()}</h1>
        </div>

        <h1 className='shop-listings-title'>All Listings</h1>

        <div className='shop-listings'>
          {shopListings.map((listing) => (
            <div
              key={listing.uid}
              className='shop-item'
              onClick={() =>
                history.push(`/listing/${listing.uid}/${listing.slug}`)
              }
            >
              <img
                src={`http://localhost:5000/uploads/images/${listing.image}`}
                alt={listing.title}
              />
              <h2>{listing.title}</h2>
              <p>${listing.price}</p>
            </div>
          ))}
        </div>
      </StyledMain>
    );
  };

  return shopListings ? renderShopListings() : null;
};

const StyledMain = styled.main`
  .back-btn {
    height: 2.4rem;
    width: 8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
    margin: 1.6rem 0 3.2rem 0;
  }

  .shop-listings-title {
    font-size: 1.8rem;
    font-weight: 500;
    margin: 2.4rem 0 1.6rem 0;
  }

  .shop-listings {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.6rem;
  }

  .shop-item {
    cursor: pointer;

    img {
      width: 100%;
      height: 10rem;
    }

    h2 {
      margin-top: 0.8rem;
      font-size: 1.4rem;
      font-weight: 300;
    }

    p {
      font-weight: 500;
    }
  }
`;

export default Shop;
