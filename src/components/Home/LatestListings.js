import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../../config';

const LatestListings = () => {
  const [listings, setListings] = useState(null);
  let history = useHistory();

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch(`${API_URL}/listings/app/latest`);
      const data = await res.json();
      console.log(data);
      return setListings(data.listings);
    };
    getListings();
  }, []);

  const renderListings = () => {
    if (!listings.length) {
      return null;
    }

    return (
      <StyledMain>
        <h1 className='newly-added-title'>Newly Added</h1>
        <StyledDiv>
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
        </StyledDiv>
      </StyledMain>
    );
  };

  return listings ? renderListings() : null;
};

const StyledMain = styled.main`
  h1 {
    margin-top: 4.8rem;
    margin-bottom: 2.4rem;
    text-align: center;
    font-weight: 600;
  }
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2.4rem 1.6rem;

  .listing {
    h1 {
      margin-top: 0;
      margin-bottom: 0;
      text-align: left;
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

export default LatestListings;
