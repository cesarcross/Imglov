import React from 'react';
import { shallow } from 'enzyme';

import Gallery from '../../../components/pages/Gallery';

test('should render Gallery component', () => {
  const wrapper = shallow(<Gallery />);
  expect(wrapper).toMatchSnapshot();
});