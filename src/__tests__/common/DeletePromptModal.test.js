import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DeletePromptModal from '../../components/common/DeletePromptModal';

describe('Login', () => {
  const wrapper = shallow(<DeletePromptModal />);
  it('Renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
