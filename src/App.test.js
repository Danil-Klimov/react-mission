import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import Table from './components/Table';

describe('App', () => {
  it('add row', () => {
    const wrapper = mount(<App />)
    expect(wrapper.state()).toEqual(1)
  })
})
