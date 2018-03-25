import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import HomePage from '../../components/pages/HomePage';

describe('HomePage', () => {
  const wrapper = shallow(<HomePage />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
