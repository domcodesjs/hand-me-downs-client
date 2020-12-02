import React from 'react';
import EditListingForm from './EditListingForm';
import styled from 'styled-components';

const EditListing = () => {
  return (
    <StyledMain>
      <h1>Edit Listing</h1>
      <EditListingForm></EditListingForm>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  h1 {
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    margin: 1.6rem 0;
  }

  @media (min-width: 576px) {
    h1 {
      margin: 1.6rem auto 1.6rem auto;
    }

    form {
      margin: 0 auto;
    }
  }
`;

export default EditListing;
