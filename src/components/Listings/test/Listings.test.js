import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Listings from '../Listings';

configure({ adapter: new Adapter() });

it('Listings component renders without crashing', () => {
  shallow(<Listings></Listings>);
});
