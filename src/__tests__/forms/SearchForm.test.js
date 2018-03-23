import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SearchForm from '../../components/forms/SearchForm';

describe('Search form', () => {
  const wrapper = shallow(<SearchForm />);
  it('Renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
