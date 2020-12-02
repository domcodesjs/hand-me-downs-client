import authReducer from './authReducer';
import listingsReducer from './listingsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  listings: listingsReducer
});

export default rootReducer;
