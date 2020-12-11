import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import LatestListings from '../LatestListings';

configure({ adapter: new Adapter() });

it('Latest Listings component renders without crashing', () => {
  shallow(<LatestListings></LatestListings>);
});
