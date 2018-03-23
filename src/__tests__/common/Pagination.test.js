import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Pagination from '../../components/common/Pagination';

describe('Pagination', () => {
  // eslint-disable-next-line
  const wrapper = shallow(<Pagination pageCount={5}/>);
  it('Renders properly when user is logged in', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
