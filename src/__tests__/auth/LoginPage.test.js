import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoginPage from '../../components/pages/LoginPage';

describe('Login', () => {
  const wrapper = shallow(<LoginPage />);
  it('Renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders all the divs', () => {
    expect(wrapper.find('div').length).toBe(3);
  });
});
