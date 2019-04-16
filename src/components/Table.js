import React, { Component } from 'react';

class Table extends Component {
  state = {
    createTable: () => {
      return this.props.table.map((item) => {
        return <tr key={item.id}>{item.row.map((item) => {
          return <td key={item.id} style={{ width: this.props.size + 'px', height: this.props.size + 'px' }}>{item.cellText}</td>
        })}</tr>
      })
    }
  }

  render() {
    return (
      <table className="table"
        onMouseEnter={this.props.onMouseEnter}
        onMouseOver={this.props.onMouseOver}>
        <tbody>
          {this.state.createTable()}
        </tbody>
      </table>
    );
  }
}

export default Table;