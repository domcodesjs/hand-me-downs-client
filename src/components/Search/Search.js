import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { API_URL } from '../../config';
import SearchForm from '../SearchForm/SearchForm';

const Search = () => {
  const [results, setResults] = useState(null);
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    let url = `${API_URL}/listings`;
    const getListings = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        return setResults(data.listings);
      } catch (err) {
        return history.push('/');
      }
    };

    if (location.search.length) {
      const queries = queryString.parse(location.search);
      if (queries['title']) {
        return getListings(`${url}?title=${queries['title']}`);
      }
    }

    return getListings(url);
  }, [location.search, history]);

  const renderResults = () => {
    if (!results.length) {
      if (location.search.length) {
        const queries = queryString.parse(location.search);
        return queries['title'] ? (
          <p>No Results Found for {queries['title']}</p>
        ) : (
          <p>No Results Found</p>
        );
      }
      return <p>No Results Found</p>;
    }

    return (
      <div className='results'>
        {results.map((listing) => (
          <div className='result' key={listing.id}>
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
    );
  };

  return results ? (
    <>
      <SearchForm></SearchForm>
      <StyledMain>
        <h1>Search Results</h1>
        {renderResults()}
      </StyledMain>
    </>
  ) : null;
};

const StyledMain = styled.main`
  h1 {
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    margin: 1.6rem 0;
  }

  .results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 2.4rem 1.6rem;
  }

  .result {
    h1 {
      font-size: 1.6rem;
      border-bottom: none;
      padding-bottom: 0;
      margin: 0;
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

export default Search;
