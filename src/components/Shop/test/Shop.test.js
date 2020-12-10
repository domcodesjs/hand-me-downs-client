import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Shop from '../Shop';

configure({ adapter: new Adapter() });

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('Shop component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <Shop></Shop>
    </RenderWithRouter>
  );
});
