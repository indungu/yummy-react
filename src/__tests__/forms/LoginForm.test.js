import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoginForm from '../../components/forms/LoginForm';

describe('Login', () => {
  const wrapper = shallow(<LoginForm />);
  it('Renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
