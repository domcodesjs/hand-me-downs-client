import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import LatestListings from './LatestListings';

const Home = () => {
  return (
    <>
      <SearchForm></SearchForm>
      <LatestListings></LatestListings>
    </>
  );
};

export default Home;
