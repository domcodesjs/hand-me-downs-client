import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import SignupForm from '../SignupForm';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({ auth: { user: true } });

it('Signup Form component renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <SignupForm></SignupForm>
    </Provider>
  );
});
