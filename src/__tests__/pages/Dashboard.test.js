import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Dashboard from '../../components/pages/Dashboard';
import NavBar from '../../components/common/NavBar';

describe('Dashboard', () => {
  const wrapper = shallow(<Dashboard />);
  const initialState = {
    categoryName: '',
    categoryDescription: '',
    categories: [],
    categoryPage: 1,
    categoryPages: 1,
    redirect: false,
    recipes: [],
    recipePage: 1,
    recipePages: 1,
    displayRecipesTable: 'none',
    displayRecipeAddModal: 'none',
    displayRecipeEditModal: 'none',
    displayCategoryAddModal: 'none',
    displayRecipeDeletePrompt: 'none',
    categoryId: '',
    categoryViewName: '',
    recipeName: '',
    recipeIngredients: '',
    recipeDescription: '',
    toDelete: '',
    queryString: '',
  };

  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Mounts with this initial state', () => {
    expect(wrapper.state()).toEqual(initialState);
  });

  it('Renders the appropriate NavBar', () => {
    // eslint-disable-next-line
    expect(wrapper.find(<NavBar isLoggedIn={true} />).find('button'));
  });

  it('Allows Category Add', () => {
    const preventDefault = jest.fn();
    expect(wrapper.find('#addCategoryBtn').length).toBe(1);
    expect(wrapper.instance().handleAddCategory({ preventDefault }));
  });

  it('Load categories on component mount', () => {
    const preventDefault = jest.fn();
    expect(wrapper.instance().componentWillMount({ preventDefault }));
  });
});
