import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from './SearchForm';

const Search = () => {
  let location = useLocation();

  console.log(location);
  return (
    <main>
      <h1>Search Page</h1>
      <SearchForm></SearchForm>
    </main>
  );
};

export default Search;
