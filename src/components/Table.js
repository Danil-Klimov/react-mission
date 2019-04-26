import React, { Component } from 'react';

class Table extends Component {
  createTable = () => {
    return this.props.rows.rowsArray.map((item) => {
      return <tr key={item}>{this.props.cells.cellsArray.map((item) => {
        return <td key={item} style={{ width: this.props.size + 'px', height: this.props.size + 'px' }}></td>
      })}</tr>
    })
  }

  render() {
    return (
      <table className="table"
        onMouseEnter={this.props.onMouseEnter}
        onMouseOver={this.props.onMouseOver}>
        <tbody>
          {this.createTable()}
        </tbody>
      </table>
    );
  }
}

export default Table;