import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../../config';
import SearchForm from '../SearchForm/SearchForm';

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [added, setAdded] = useState(false);
  let { listingId, listingSlug } = useParams();
  let history = useHistory();

  useEffect(() => {
    const getListing = async () => {
      const res = await fetch(`${API_URL}/listings/${listingId}`);
      const data = await res.json();
      if (data.listing.slug !== listingSlug) {
        return history.push(
          `/listing/${data.listing.uid}/${data.listing.slug}`
        );
      }

      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const itemExists = cart.find((item) => item.uid === data.listing.uid);

        if (itemExists) {
          setAdded(true);
        }
      }

      return setListing(data.listing);
    };
    getListing();
  }, [listingId, listingSlug, history]);

  const handleAddToCart = async () => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([listing]));
      return setAdded(true);
    }

    const cart = JSON.parse(localStorage.getItem('cart'));
    const itemExists = cart.find((item) => item.uid === listing.uid);

    if (itemExists) {
      return;
    }

    localStorage.setItem('cart', JSON.stringify([...cart, listing]));
    return setAdded(true);
  };

  const handleRemoveFromCart = async () => {
    if (!localStorage.getItem('cart')) {
      return setAdded(false);
    }

    const filteredCart = JSON.parse(localStorage.getItem('cart')).filter(
      (item) => item.uid !== listing.uid
    );
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    return setAdded(false);
  };

  const renderListingButton = () => {
    return added ? (
      <button onClick={handleRemoveFromCart}>Remove from Cart</button>
    ) : (
      <button onClick={handleAddToCart}>Add to Cart</button>
    );
  };

  const renderListing = () => {
    return (
      <>
        <SearchForm></SearchForm>
        <StyledMain>
          <img
            src={`${API_URL}/uploads/images/${listing.image}`}
            alt='Product'
          />
          <div className='listing-info'>
            <div className='quick-info'>
              <h1>{listing.title}</h1>
              <p>${listing.price}</p>
            </div>

            <Link
              className='listing-seller'
              to={`/shop/${listing.sellerUsername}`}
            >
              {listing.sellerUsername}
            </Link>

            {listing.sold ? (
              <button type='button'>Sold</button>
            ) : (
              renderListingButton()
            )}

            <div className='listing-description'>
              <h2>Description</h2>
              <p>{listing.description}</p>
            </div>

            <div className='listing-refund-policy'>
              <h2>Return Policy</h2>
              <p>
                You are protected every time you make a purchase on hand me
                downs. We will give you a full refund if your item never ships
                or does not match the listing description. Otherwise, all sales
                are final.
              </p>
            </div>
          </div>
        </StyledMain>
      </>
    );
  };

  return !listing ? <p>Loading...</p> : renderListing();
};

const StyledMain = styled.main`
  margin-top: 3.2rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1.6rem;

  .quick-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1.8rem;
      font-weight: 300;
    }

    p {
      font-weight: 500;
    }
  }

  .listing-seller {
    margin-top: 0.8rem;
    color: #008fff;
  }

  .listing-description {
    h2 {
      font-size: 1.8rem;
      font-weight: 500;
    }

    p {
      font-weight: 300;
      line-height: 2.2rem;
      margin-top: 0.8rem;
    }
  }

  .listing-refund-policy {
    margin-top: 2.4rem;

    h2 {
      font-size: 1.8rem;
      font-weight: 500;
    }

    p {
      font-weight: 300;
      line-height: 2.2rem;
      margin-top: 0.8rem;
    }
  }

  img {
    width: 100%;
  }

  .back-btn {
    height: 2.4rem;
    width: 8rem;
  }

  button {
    width: 100%;
    height: 4.8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
    margin: 1.6rem 0 3.2rem 0;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.6rem;
  }
`;

export default Listing;
