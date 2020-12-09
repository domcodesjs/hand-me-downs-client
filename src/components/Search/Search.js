import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SearchForm from './SearchForm';

const Search = () => {
  const [results, setResults] = useState(null);
  let history = useHistory();
  let location = useLocation();

  console.log(location);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    try {
      const res = await fetch('http://localhost:5000/listings');
      const data = await res.json();
      console.log(data);
      return setResults(data.listings);
    } catch (err) {
      console.log(err);
    }
  };

  const renderResults = () => {
    return (
      <div className='results'>
        {results.map((listing) => (
          <div
            className='result'
            key={listing.uid}
            onClick={() =>
              history.push(`/listing/${listing.uid}/${listing.slug}`)
            }
          >
            <img
              src={`http://localhost:5000/uploads/images/${listing.image}`}
              alt=''
            />
            <h1>{listing.title}</h1>
            <p>${listing.price}</p>
          </div>
        ))}
      </div>
    );
  };

  return results ? (
    <StyledMain>
      <h1>Search</h1>
      <SearchForm></SearchForm>
      {renderResults()}
    </StyledMain>
  ) : null;
};

const StyledMain = styled.main`
  .results {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2.4rem 1.6rem;
  }

  .result {
    h1 {
      font-size: 1.8rem;
    }

    p {
      font-weight: 600;
      font-size: 1.4rem;
    }

    img {
      width: 100%;
    }
  }

  @media (min-width: 576px) {
    .results {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 992px) {
    .results {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default Search;
