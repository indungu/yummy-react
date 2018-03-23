import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import RecipesEditModal from '../../components/resources/recipes/RecipesEditModal';

describe('RecipesEditModal', () => {
  const wrapper = shallow(<RecipesEditModal />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
