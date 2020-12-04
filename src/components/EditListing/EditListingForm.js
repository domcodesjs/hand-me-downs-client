import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { verifyJWT } from '../../store/actions/authActions';

const EditListingForm = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const authState = useSelector(({ auth }) => auth);
  let history = useHistory();
  let { listingId } = useParams();
  const dispatch = useDispatch();
  const checkJWT = useCallback(() => dispatch(verifyJWT()), [dispatch]);

  useEffect(() => {
    if (!authState.user) {
      if (localStorage.getItem('jwt')) {
        return checkJWT();
      }

      return history.push('/login');
    }
  }, [authState.user, checkJWT, history]);

  useEffect(() => {
    const getListing = async () => {
      try {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(
          `https://secure-citadel-31026.herokuapp.com/listings/user/update/${listingId}`,
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

        setTitle(data.listing.title);
        setDescription(data.listing.description);
        setCategory(data.listing.category);
        setPrice(data.listing.price);
      } catch (err) {
        console.log(err);
      }
    };

    getListing();
  }, [authState.user, history, listingId, checkJWT]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }

      const JWT = localStorage.getItem('jwt');
      const res = await fetch(
        `https://secure-citadel-31026.herokuapp.com/listings/${listingId}`,
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
        return;
      }

      return history.push(`/your/listings`);
    } catch (err) {
      console.log(err);
    }
  };

  const fileChangedHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
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
      <label htmlFor='category'>Category</label>
      <select
        id='category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value='T-Shirts'>T-Shirts</option>
        <option value='Jeans'>Jeans</option>
        <option value='Hats'>Hats</option>
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
  );
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

export default EditListingForm;
