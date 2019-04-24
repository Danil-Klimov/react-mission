import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import Table from './components/Table';

describe('App', () => {
  describe('initial render', () => {
    const app = mount(<App initialWidth={5} initialHeight={5} />);

    it('initialHeight render table rows', () => {
      expect(app.state().table.length).toEqual(app.prop('initialHeight'));
    });

    it('initialWidth render table cols', () => {
      expect(app.state().table[0].row.length).toEqual(app.prop('initialWidth'));
    });
  });

  describe('add buttons', () => {
    const app = mount(<App initialWidth={4} initialHeight={4} />);

    it('add row', () => {
      expect(app.find('.table tr').getElements().length).toEqual(app.state().table.length);
      app.find('button.table__button_add-row').simulate('click');
      expect(app.find('.table tr').getElements().length).toEqual(app.state().table.length);
    });

    it('add col', () => {
      const colCount = app.find('table tr td').getElements().map((item) => {
        return item;
      })
      expect(colCount.length / app.state().table.length).toEqual(app.state().table[0].row.length);
      app.find('button.table__button_add-col').simulate('click');
      expect(colCount.length / app.state().table.length + 1).toEqual(app.state().table[0].row.length);
    });
  });
  
  describe('del buttons', () => {
    const app = mount(<App initialWidth={4} initialHeight={4} />);

    it('del row', () => {
      expect(app.find('.table tr').getElements().length).toEqual(app.state().table.length);
      app.find('button.table__button_del-row').simulate('click');
      expect(app.find('.table tr').getElements().length).toEqual(app.state().table.length);
    });

    it('del col', () => {
      const colCount = app.find('table tr td').getElements().map((item) => {
        return item;
      })
      expect(colCount.length / app.state().table.length).toEqual(app.state().table[0].row.length);
      app.find('button.table__button_del-col').simulate('click');
      expect(colCount.length / app.state().table.length - 1).toEqual(app.state().table[0].row.length);
    });
  });
});
