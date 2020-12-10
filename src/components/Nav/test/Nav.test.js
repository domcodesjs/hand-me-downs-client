import React from 'react';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Nav from '../Nav';

configure({ adapter: new Adapter() });

it('Nav component renders without crashing', () => {
  shallow(<Nav></Nav>);
});
