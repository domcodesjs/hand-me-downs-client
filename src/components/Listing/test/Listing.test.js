import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Listing from '../Listing';

configure({ adapter: new Adapter() });

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('Listing component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <Listing></Listing>
    </RenderWithRouter>
  );
});
