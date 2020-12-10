import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import EditListing from '../EditListing';

configure({ adapter: new Adapter() });

it('Edit Listing component renders without crashing', () => {
  shallow(<EditListing></EditListing>);
});
