import React from 'react';
import { shallow } from 'enzyme';

import Home from '../../../components/pages/Home';

test('should render Home component', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toMatchSnapshot();
});