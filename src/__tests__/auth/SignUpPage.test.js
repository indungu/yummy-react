import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SignUpPage from '../../components/pages/SignUpPage';

describe('SignUpPage', () => {
  const wrapper = shallow(<SignUpPage />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
