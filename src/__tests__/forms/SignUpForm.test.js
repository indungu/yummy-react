import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SignUpForm from '../../components/forms/SignUpForm';

describe('SignUp form', () => {
  const wrapper = shallow(<SignUpForm />);
  // const preventDefault = jest.fn();
  it('Renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Renders with the correct initial state', () => {
    expect(wrapper.state().username).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().confirmPassword).toEqual('');
  });

  // it('should create a user', () => {
  //   wrapper.setState({
  //     email: 'naibor@liz.en',
  //     username: 'naibor',
  //     password: 'P@ssw0rd',
  //     confirmPassword: 'P@ssw0rd',
  //   });
  //   wrapper.find('button#submitInfo').simulate('submit', { preventDefault });
  //   expect(wrapper.instance().onSubmit({ preventDefault }));
  // });
});
