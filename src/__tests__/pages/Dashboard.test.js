import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Dashboard from '../../components/pages/Dashboard';

describe('Dashboard', () => {
  const wrapper = shallow(<Dashboard />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
