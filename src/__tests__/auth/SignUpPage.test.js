import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SignUpPage from '../../components/pages/SignUpPage';

describe('SignUpPage', () => {
  const wrapper = shallow(<SignUpPage />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders all the divs', () => {
    expect(wrapper.find('div').length).toBe(3);
  });
});
