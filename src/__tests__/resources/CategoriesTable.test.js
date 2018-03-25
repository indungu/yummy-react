import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CategoriesTable from '../../components/resources/categories/CategoriesTable';

describe('CategoriesTable', () => {
  const wrapper = shallow(<CategoriesTable />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
