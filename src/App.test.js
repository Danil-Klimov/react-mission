import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import Table from './components/Table';

describe('App', () => {
  describe('initial render', () => {
    const app = mount(<App initialWidth={5} initialHeight={5} />);

    it('initialHeight render table rows', () => {
      expect(app.find('.table tr').getElements().length).toEqual(app.prop('initialHeight'));
    });

    it('initialWidth render table cols', () => {
      expect(app.find('table tr:first-child td').getElements().length).toEqual(app.prop('initialWidth'));
    });
  });

  describe('add buttons', () => {
    const app = mount(<App initialWidth={4} initialHeight={4} />);

    it('add row', () => {
      app.find('button.table__button_add-row').simulate('click');
      expect(app.find('.table tr').getElements().length).toEqual(app.state().rows.rowsArray.length);
    });

    it('add col', () => {
      app.find('button.table__button_add-col').simulate('click');
      expect(app.find('table tr:first-child td').getElements().length).toEqual(app.state().cells.cellsArray.length);
    });
  });

  describe('del buttons', () => {
    const app = mount(<App initialWidth={4} initialHeight={4} />);

    it('del row', () => {
      app.find('button.table__button_del-row').simulate('click');
      expect(app.find('.table tr').getElements().length).toEqual(app.state().rows.rowsArray.length);
    });

    it('del col', () => {
      app.find('button.table__button_del-col').simulate('click');
      expect(app.find('table tr:first-child td').getElements().length).toEqual(app.state().cells.cellsArray.length);
    });
  });
});
