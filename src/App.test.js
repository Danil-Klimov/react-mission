import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TableContainer from "./components/TableContainer";

describe('App', () => {
  describe('initial render', () => {
    const tableContainer = mount(<TableContainer initialWidth={5} initialHeight={5} />);

    it('initialHeight render table rows', () => {
      expect(tableContainer.find('.table tr').getElements().length).toEqual(tableContainer.prop('initialHeight'));
    });

    it('initialWidth render table cols', () => {
      expect(tableContainer.find('table tr:first-child td').getElements().length).toEqual(tableContainer.prop('initialWidth'));
    });
  });

  describe('add buttons', () => {
    const tableContainer = mount(<TableContainer initialWidth={4} initialHeight={4} />);

    it('add row', () => {
      tableContainer.find('button.table__button_add-row').simulate('click');
      expect(tableContainer.find('.table tr').getElements().length).toEqual(tableContainer.state().rows.length);
    });

    it('add col', () => {
      tableContainer.find('button.table__button_add-col').simulate('click');
      expect(tableContainer.find('table tr:first-child td').getElements().length).toEqual(tableContainer.state().cells.length);
    });
  });

  describe('del buttons', () => {
    const tableContainer = mount(<TableContainer initialWidth={4} initialHeight={4} />);

    it('del row', () => {
      tableContainer.find('button.table__button_del-row').simulate('click');
      expect(tableContainer.find('.table tr').getElements().length).toEqual(tableContainer.state().rows.length);
    });

    it('del col', () => {
      tableContainer.find('button.table__button_del-col').simulate('click');
      expect(tableContainer.find('table tr:first-child td').getElements().length).toEqual(tableContainer.state().cells.length);
    });
  });
});
