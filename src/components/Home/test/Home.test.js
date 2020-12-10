import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Home from '../Home';

configure({ adapter: new Adapter() });

it('Home component renders without crashing', () => {
  shallow(<Home></Home>);
});
