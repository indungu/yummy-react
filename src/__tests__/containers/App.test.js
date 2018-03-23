import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import App from '../../App';

describe('App', () => {
  const wrapper = shallow(<App />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
