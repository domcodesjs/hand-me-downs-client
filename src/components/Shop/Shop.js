import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../../config';
import SearchForm from '../SearchForm/SearchForm';

const Shop = () => {
  const [shopListings, setShopListings] = useState(null);
  let { username } = useParams();
  let history = useHistory();

  useEffect(() => {
    const getShopListings = async () => {
      const res = await fetch(`${API_URL}/listings/shop/${username}`);
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
      <>
        <SearchForm></SearchForm>
        <StyledMain>
          <h1>{username.trimEnd().toLowerCase()}</h1>

          <StyledDiv>
            {shopListings.map((listing) => (
              <div className='listing' key={listing.uid}>
                <img
                  src={`${API_URL}/uploads/images/${listing.image}`}
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
        </StyledMain>
      </>
    );
  };

  return shopListings ? renderShopListings() : null;
};

const StyledMain = styled.main`
  h1 {
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    margin: 1.6rem 0;
  }
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
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

export default Shop;
