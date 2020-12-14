import React from 'react';
import styled from 'styled-components';
import SearchForm from '../SearchForm/SearchForm';
import LatestListings from './LatestListings';

const Home = () => {
  return (
    <>
      <SearchForm></SearchForm>
      <StyledHome>
        <div>
          <h1 className='home-title'>Newly Added</h1>
          <LatestListings></LatestListings>
        </div>
      </StyledHome>
    </>
  );
};

const StyledHome = styled.main`
  .home-title {
    margin-top: 4.8rem;
    margin-bottom: 2.4rem;
    text-align: center;
    font-weight: 600;
  }
`;

export default Home;
