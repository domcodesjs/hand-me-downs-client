import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import SearchForm from '../SearchForm';

configure({ adapter: new Adapter() });

it('Search Form component renders without crashing', () => {
  shallow(<SearchForm></SearchForm>);
});
