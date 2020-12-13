import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const SearchForm = () => {
  const [title, setTitle] = useState('');
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim().length) {
      setTitle('');
      return history.push(`/search`);
    }
    setTitle('');
    return history.push(`/search?title=${title}`);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='item to search for...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type='submit'>Search</button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  height: 4.8rem;
  margin: 1.6rem 0;
  justify-content: space-between;

  input {
    width: 71.5%;
    border-radius: 0.4rem;
    padding-left: 0.8rem;
    font-size: 1.6rem;
    border: 0.1rem solid #000;
  }

  button {
    width: 27.5%;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
  }

  @media (min-width: 576px) {
    input {
      width: 81.5%;
    }

    button {
      width: 17.5%;
    }
  }

  @media (min-width: 768px) {
    input {
      width: 89.5%;
    }

    button {
      width: 9.5%;
    }
  }
`;

export default SearchForm;
