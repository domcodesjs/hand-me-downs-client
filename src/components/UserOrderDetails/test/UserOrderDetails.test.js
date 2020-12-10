import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import UserOrderDetails from '../UserOrderDetails';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({ auth: { user: true } });

it('User Order Details component renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <UserOrderDetails></UserOrderDetails>
    </Provider>
  );
});
