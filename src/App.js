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
import Listings from './components/Listings/Listings';
import UserListings from './components/UserListings/UserListings';
import EditListing from './components/EditListing/EditListing';
import Checkout from './components/Checkout/Checkout';
import UserPurchases from './components/UserPurchases/UserPurchases';
import UserOrders from './components/UserOrders/UserOrders';
import UserOrderDetails from './components/UserOrderDetails/UserOrderDetails';
import UserPurchaseDetails from './components/UserPurchaseDetails/UserPurchaseDetails';
import PrivateRoute from './PrivateRoute';
import Search from './components/Search/Search';

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
            <Route exact path='/listings'>
              <Listings></Listings>
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
            <Route exact path='/search'>
              <Search></Search>
            </Route>
            <PrivateRoute
              exact
              path='/checkout'
              component={Checkout}
            ></PrivateRoute>
            {/* /your Routes */}
            <PrivateRoute
              exact
              path='/your/listings/new'
              component={AddListing}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/your/orders'
              component={UserOrders}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/your/order/:orderId'
              component={UserOrderDetails}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/your/purchase/:purchaseId'
              component={UserPurchaseDetails}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/your/listings'
              component={UserListings}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/your/purchases'
              component={UserPurchases}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/your/listings/:listingId/edit'
              component={EditListing}
            ></PrivateRoute>
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
