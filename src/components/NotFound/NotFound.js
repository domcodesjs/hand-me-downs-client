import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <StyledMain>
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
