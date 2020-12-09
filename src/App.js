import React, { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { verifyJWT } from './store/actions/authActions';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Listing from './components/Listing/Listing';
import GlobalStyle from './globalStyle';
import SluglessListing from './components/Listing/SluglessListing';
import Shop from './components/Shop/Shop';
import SlideoutNav from './components/Nav/SlideoutNav';
import Cart from './components/Cart/Cart';
import AddListing from './components/AddListing/AddListing';
import UserListings from './components/UserListings/UserListings';
import EditListing from './components/EditListing/EditListing';
import Checkout from './components/Checkout/Checkout';
import UserPurchases from './components/UserPurchases/UserPurchases';
import UserOrders from './components/UserOrders/UserOrders';
import UserOrderDetails from './components/UserOrderDetails/UserOrderDetails';
import UserPurchaseDetails from './components/UserPurchaseDetails/UserPurchaseDetails';
import Search from './components/Search/Search';
import SearchForm from './components/SearchForm/SearchForm';

const App = () => {
  const [navActive, setNavActive] = useState(false);
  const dispatch = useDispatch();
  const checkJWT = useCallback(() => dispatch(verifyJWT()), [dispatch]);

  useEffect(() => {
    checkJWT();
  }, [checkJWT]);

  const toggleNav = () => {
    return setNavActive(!navActive);
  };

  return (
    <>
      <Router>
        <GlobalStyle></GlobalStyle>
        <Header toggleNav={toggleNav} navActive={navActive}></Header>
        <StyledWrapper>
          <SearchForm></SearchForm>
          <SlideoutNav
            navActive={navActive}
            setNavActive={setNavActive}
          ></SlideoutNav>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route exact path='/signup'>
              <Signup></Signup>
            </Route>
            <Route exact path='/login'>
              <Login></Login>
            </Route>
            <Route exact path='/listing/:listingId'>
              <SluglessListing></SluglessListing>
            </Route>
            <Route exact path='/listing/:listingId/:listingSlug'>
              <Listing></Listing>
            </Route>
            <Route exact path='/shop/:username'>
              <Shop></Shop>
            </Route>
            <Route exact path='/cart'>
              <Cart></Cart>
            </Route>
            <Route exact path='/checkout'>
              <Checkout></Checkout>
            </Route>
            <Route exact path='/search'>
              <Search></Search>
            </Route>
            {/* /your Routes */}
            <Route exact path='/your/listings/new'>
              <AddListing></AddListing>
            </Route>
            <Route exact path='/your/orders'>
              <UserOrders></UserOrders>
            </Route>
            <Route exact path='/your/order/:orderId'>
              <UserOrderDetails></UserOrderDetails>
            </Route>
            <Route exact path='/your/purchase/:purchaseId'>
              <UserPurchaseDetails></UserPurchaseDetails>
            </Route>
            <Route exact path='/your/listings'>
              <UserListings></UserListings>
            </Route>
            <Route exact path='/your/purchases'>
              <UserPurchases></UserPurchases>
            </Route>
            <Route exact path='/your/listings/:listingId/edit'>
              <EditListing></EditListing>
            </Route>
            {/* When a route is not found */}
            <Route path='/404'>
              <NotFound></NotFound>
            </Route>
            <Redirect to='/404' />
          </Switch>
        </StyledWrapper>
      </Router>
    </>
  );
};

const StyledWrapper = styled.div`
  width: 28.8rem;
  margin: 0 auto;

  @media (min-width: 576px) {
    width: 50rem;
  }
  @media (min-width: 768px) {
    width: 70rem;
  }
  @media (min-width: 992px) {
    width: 90rem;
  }

  @media (min-width: 1200px) {
    width: 112rem;
  }
`;

export default App;
