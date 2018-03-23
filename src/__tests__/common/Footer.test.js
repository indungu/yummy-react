import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Footer from '../../components/common/Footer';

describe('Login', () => {
  const wrapper = shallow(<Footer />);
  it('Renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
