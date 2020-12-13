import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

const EditListingForm = () => {
  const [errors, setErrors] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState(null);
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const authState = useSelector(({ auth }) => auth);
  let history = useHistory();
  let { listingId } = useParams();

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

  useEffect(() => {
    const getListing = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(
          `https://handmedowns-server.herokuapp.com/listings/user/update/${listingId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JWT}`,
              Accept: 'application/json'
            }
          }
        );
        const data = await res.json();

        if (!data.success) {
          return history.push('/');
        }

        console.log(data);

        setTitle(data.listing.title);
        setDescription(data.listing.description);
        setCategory(data.listing.category);
        setGender(data.listing.gender);
        setPrice(data.listing.price);
      } catch (err) {
        return history.push('/');
      }
    };

    getListing();
  }, [authState.user, history, listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors(null);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('gender', gender);
      formData.append('price', price);

      if (image) {
        formData.append('image', image);
      }

      const JWT = localStorage.getItem('jwt');
      const res = await fetch(
        `https://handmedowns-server.herokuapp.com/listings/${listingId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${JWT}`,
            Accept: 'application/json'
          },
          body: formData
        }
      );

      const data = await res.json();

      if (!data.success) {
        const errors = data.errors.map((err) => err.msg);
        return setErrors(errors);
      }

      return history.push(`/your/listings`);
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor='price'>Price</label>
      <input
        id='price'
        type='text'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select
        id='gender'
        value={gender}
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
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option disabled value={''}></option>
        {categories.map((category, idx) => (
          <option key={idx} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor='image'>Image</label>
      <input id='image' type='file' onChange={fileChangedHandler} />
      {image ? (
        <>
          <img src={URL.createObjectURL(image)} alt='photoooo' />
        </>
      ) : null}
      <div className='edit-form-btns'>
        <button type='button' onClick={history.goBack}>
          Cancel
        </button>
        <button type='submit'>Submit</button>
      </div>
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
    width: 49%;
    height: 4.8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
  }

  .edit-form-btns {
    display: flex;
    justify-content: space-between;
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

export default EditListingForm;
