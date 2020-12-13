import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const LatestListings = () => {
  const [listings, setListings] = useState(null);
  let history = useHistory();

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch(`http://localhost:5000/listings/app/latest`);
      const data = await res.json();
      return setListings(data.listings);
    };
    getListings();
  }, []);

  const renderListings = () => {
    if (!listings.length) {
      return <p>No Listings</p>;
    }

    return (
      <StyledDiv>
        {listings.map((listing) => (
          <div className='listing' key={listing.uid}>
            <img
              src={`http://localhost:5000/uploads/images/${listing.image}`}
              alt=''
              onClick={() =>
                history.push(`/listing/${listing.uid}/${listing.slug}`)
              }
            />
            <h1>{listing.title}</h1>
            <p>${listing.price}</p>
            <button
              onClick={() =>
                history.push(`/listing/${listing.uid}/${listing.slug}`)
              }
            >
              View Details
            </button>
          </div>
        ))}
      </StyledDiv>
    );
  };

  return listings ? renderListings() : null;
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2.4rem 1.6rem;

  .listing {
    h1 {
      font-size: 1.6rem;
      border-bottom: none;
      padding-bottom: 0;
      margin: 0;
      text-align: left;
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
      max-height: 12rem;
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

  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);

    .listing {
      img {
        max-height: 100%;
      }
    }
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default LatestListings;
