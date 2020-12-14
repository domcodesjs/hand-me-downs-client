import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const AddListingForm = () => {
  const [errors, setErrors] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(null);
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('');
  const [processing, setProcessing] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          'https://handmedowns-server.herokuapp.com/categories'
        );
        const data = await res.json();

        if (!data.success) {
          return;
        }

        return setCategories(data.categories);
      } catch (err) {
        return history.push('/');
      }
    };
    getCategories();
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors(null);
      setProcessing(true);

      if (!image) {
        setProcessing(false);
        return setErrors(['You must provide an image']);
      }

      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('category', category.trim());
      formData.append('gender', gender.trim());
      formData.append('price', price.trim());
      formData.append('image', image);

      const JWT = localStorage.getItem('jwt');
      const res = await fetch(
        'https://handmedowns-server.herokuapp.com/listings',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JWT}`,
            Accept: 'application/json'
          },
          body: formData
        }
      );

      const data = await res.json();

      if (!data.success) {
        setProcessing(false);
        const errors = data.errors.map((err) => err.msg);
        return setErrors(errors);
      }

      return history.push(
        `/listing/${data.listing.listing_uid}/${data.listing.listing_slug}`
      );
    } catch (err) {
      return history.push('/');
    }
  };

  const fileChangedHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return categories ? (
    <StyledForm onSubmit={handleSubmit}>
      {errors ? (
        <StyledErrors>
          {errors.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </StyledErrors>
      ) : null}
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        type='text'
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor='category'>Gender</label>
      <select
        id='gender'
        defaultValue={''}
        onChange={(e) => setGender(e.target.value)}
      >
        <option disabled value={''}></option>
        <option value='men'>Men</option>
        <option value='women'>Women</option>
        <option value='unisex'>Unisex</option>
      </select>
      <label htmlFor='category'>Category</label>
      <select
        id='category'
        defaultValue={''}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option disabled value={''}></option>
        {categories.map((category, idx) => (
          <option key={idx} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor='price'>Price</label>
      <input
        id='price'
        type='text'
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor='image'>Image</label>
      <input id='image' type='file' onChange={fileChangedHandler} />
      {image ? (
        <>
          <h3>Image Preview</h3>
          <img src={URL.createObjectURL(image)} alt='photoooo' />
        </>
      ) : null}
      {processing ? (
        <button type='button' disabled>
          Processing...
        </button>
      ) : (
        <button type='submit'>Submit</button>
      )}
    </StyledForm>
  ) : null;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.8rem;
  }

  img {
    width: 28.8rem;
    height: 28.8rem;
  }

  input,
  select {
    height: 4.8rem;
    padding-left: 0.8rem;
    margin-bottom: 1.6rem;
  }

  textarea {
    padding: 0.8rem;
    margin-bottom: 1.6rem;
    height: 14rem;
    resize: none;
  }

  select {
    cursor: pointer;
  }

  input[type='file'] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 0;
    margin-bottom: 0;
    cursor: pointer;
  }

  button {
    width: 100%;
    height: 4.8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
    margin: 1.6rem 0 3.2rem 0;
  }
`;

const StyledErrors = styled.div`
  p {
    background: #e31c3d;
    color: #fff;
    border-radius: 0.4rem;
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }

  p:last-child {
    margin-bottom: 1.6rem;
  }
`;

export default AddListingForm;
