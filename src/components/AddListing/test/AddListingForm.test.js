import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import AddListingForm from '../AddListingForm';

configure({ adapter: new Adapter() });

it('Add Listing Form component renders without crashing', () => {
  shallow(<AddListingForm></AddListingForm>);
});
