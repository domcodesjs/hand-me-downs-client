import React from 'react';
import styled from 'styled-components';

const SearchForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('working');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor='title'></label>
      <input type='text' id='title' />
      <button type='submit'>Search</button>
    </StyledForm>
  );
};

const StyledForm = styled.form``;

export default SearchForm;
