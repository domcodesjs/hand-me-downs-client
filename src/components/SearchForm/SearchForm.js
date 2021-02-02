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
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='item to search for...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchForm;
