import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Header from '../Header';

configure({ adapter: new Adapter() });

it('Header component renders without crashing', () => {
  shallow(<Header></Header>);
});
