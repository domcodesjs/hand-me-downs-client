import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import NotFound from '../NotFound';

configure({ adapter: new Adapter() });

it('Not Found component renders without crashing', () => {
  shallow(<NotFound></NotFound>);
});
