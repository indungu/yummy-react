import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CategoriesModal from '../../components/resources/categories/CategoriesModal';

describe('CategoriesModal', () => {
  const wrapper = shallow(<CategoriesModal />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
