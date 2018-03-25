import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import RecipesTable from '../../components/resources/recipes/RecipesTable';

describe('RecipesTable', () => {
  const props = {
    data: [{
      name: 'some cookie',
      ingredients: 'some ingredient',
      description: 'some decription',
    }],
    categoryId: 1,
  };
  const wrapper = mount(
    <RecipesTable
      data={props.data}
      categoryId={props.categoryId}
    />,
  );
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
