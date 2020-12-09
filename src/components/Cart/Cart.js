import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));

      return setCartItems(cart);
    }
    return setCartItems([]);
  }, []);

  const renderCart = () => {
    if (!cartItems.length) {
      return (
        <StyledMain>
          <h1>Cart</h1>
          <p>You haven't added any items to your cart</p>
        </StyledMain>
      );
    }

    return (
      <StyledMain>
        <h1>Your Cart $</h1>
        {/* <p>{cartItems.length} items</p> */}
        <button onClick={() => history.push('/checkout')}>
          Checkout $
          {cartItems.reduce((a, c) => (a += parseFloat(c.price)), 0).toFixed(2)}
        </button>
        <div className='cart-items'>
          {cartItems.map((item) => (
            <div key={item.uid} className='cart-item'>
              <img
                src={`http://localhost:5000/uploads/images/${item.image}`}
                alt='Product'
              />
              <h1>{item.title}</h1>

              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </StyledMain>
    );
  };

  return cartItems ? renderCart() : null;
};

const StyledMain = styled.main`
  h1 {
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    margin: 1.6rem 0;
  }

  p {
    text-align: center;
  }

  @media (min-width: 576px) {
    h1 {
      margin: 1.6rem auto 1.6rem auto;
    }

    form {
      margin: 0 auto;
    }
  }

  .back-btn {
    height: 2.4rem;
    width: 8rem;
  }

  .cart-items {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      height: 10rem;
      /* display: none; */
    }
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

export default Cart;
