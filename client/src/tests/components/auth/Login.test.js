import React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../../../components/auth/Login';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Login />);
});

test('should render Login component', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should set email on input change', () => {
  const value = 'tom@ex.com';
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('email').value).toBe(value);
});

test('should set password on input change', () => {
  const value = 'password';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('password').value).toBe(value);
});

test.skip('should call onSubmit for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const sessionStorage = { removeItem: jest.fn() };
  const fetchSpy = jest.fn(global, 'fetch').mockImplementation(() => {});
  wrapper = shallow(<Login onSubmit={onSubmitSpy} />);
  
  // wrapper.state('email').value = 'tom@ex.com';
  // wrapper.state('password').value = 'password';
  wrapper.setState({
    email: { value: 'tom@ex.com' },
    password: { value: 'password' }
  });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').value).toBe('');
});

test.skip('should not allow submission for invalid form input', () => {});

test.skip('should render an error if the user is not found or password does not match', () => {});
