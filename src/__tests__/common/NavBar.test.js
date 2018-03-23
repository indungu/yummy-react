import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NavBar from '../../components/common/NavBar';

describe('Login', () => {
  const wrapper1 = shallow(<NavBar />);
  it('Renders properly', () => {
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  // eslint-disable-next-line
  const wrapper2 = shallow(<NavBar isLoggedIn={true} user="Mark" />);
  it('Renders properly when user is logged in', () => {
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
  });
});
