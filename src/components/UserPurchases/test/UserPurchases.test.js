import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import UserPurchases from '../UserPurchases';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({ auth: { user: true } });

it('User Purchases component renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <UserPurchases></UserPurchases>
    </Provider>
  );
});
