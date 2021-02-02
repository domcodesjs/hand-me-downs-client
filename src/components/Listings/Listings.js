import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../../config';

const Listings = () => {
  const [listings, setListings] = useState();
  let history = useHistory();

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch(`${API_URL}/listings`);
        const data = await res.json();
        return setListings(data.listings);
      } catch (err) {
        return history.push('/');
      }
    };
    getListings();
  }, [history]);

  return listings ? (
    <StyledMain>
      <h1 className='listing-title'>All Listings</h1>
      <div className='listings'>
        {listings.map((listing) => (
          <div className='listing' key={listing.id}>
            <img
              src={`${API_URL}/uploads/images/${listing.image}`}
              alt=''
              onClick={() =>
                history.push(`/listing/${listing.id}/${listing.slug}`)
              }
            />
            <h1>{listing.title}</h1>
            <p>${(listing.price / 100).toFixed(2)}</p>
            <button
              onClick={() =>
                history.push(`/listing/${listing.id}/${listing.slug}`)
              }
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </StyledMain>
  ) : null;
};

const StyledMain = styled.main`
  .listing-title {
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    margin: 1.6rem 0;
  }

  .listings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 2.4rem 1.6rem;
  }

  .listing {
    h1 {
      font-size: 1.6rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 95%;
    }

    p {
      font-weight: 600;
      font-size: 1.4rem;
    }

    img {
      width: 100%;
      cursor: pointer;
    }

    button {
      margin-top: 0.8rem;
      width: 100%;
      height: 4.8rem;
      background: #3c3c3c;
      border-radius: 0.4rem;
      color: #fff;
      font-size: 1.4rem;
    }
  }
`;

export default Listings;
