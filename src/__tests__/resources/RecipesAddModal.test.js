import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import RecipesAddModal from '../../components/resources/recipes/RecipesAddModal';

describe('RecipesAddModal', () => {
  const wrapper = shallow(<RecipesAddModal />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
