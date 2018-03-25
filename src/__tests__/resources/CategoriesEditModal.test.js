import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CategoriesEditModal from '../../components/resources/categories/CategoriesEditModal';

describe('CategoriesEditModal', () => {
  const wrapper = shallow(<CategoriesEditModal />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
