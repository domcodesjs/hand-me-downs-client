import React from 'react';
import SearchForm from '../SearchForm';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <StyledMain>
      <SearchForm></SearchForm>
      <h1>Not Found</h1>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  h1 {
    text-align: center;
  }
`;

export default NotFound;
