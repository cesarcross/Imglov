import React from 'react';
import { shallow } from 'enzyme';

import { Signup } from '../../../components/auth/Signup';

let wrapper;

beforeEach(() =>{
  wrapper = shallow(<Signup />);
});

test('should render Signup component', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should set the name on input change', () => {
  const value = 'Tom';
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('name').value).toBe(value);
});

test('should set the email on input change', () => {
  const value = 'tom@ex.com';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('email').value).toBe(value);
});

test('should set the password on input change', () => {
  const value = '12345678';
  wrapper.find('input').at(2).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('password').value).toBe(value);
});

test('should set the password_confirmation on input change', () => {
  const value = '12345678';
  wrapper.find('input').at(3).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('password_confirmation').value).toBe(value);
});
