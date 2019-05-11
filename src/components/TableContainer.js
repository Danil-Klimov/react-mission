import React, { Component } from 'react';
import Table from "./Table";
import Button from "./Button";

class TableContainer extends Component {
  state = {
    colIndex: null,
    rowIndex: null,
    delRowButton: {
      show: false,
      position: null
    },
    delColButton: {
      show: false,
      position: null
    },
    rows: [],
    cells: [],
    rowId: 0,
    cellId: 0,
  };
  constructor(props) {
    super(props);
    const initialRows = Array(this.props.initialHeight).fill('');
    const initialCells = Array(this.props.initialWidth).fill('');
    let rowId = this.state.rowId;
    let cellId = this.state.cellId;
    const rows = initialRows.map(() => rowId++);
    const cells = initialCells.map(() => cellId++);
    this.state = {
      ...this.state,
      cells: cells,
      cellId: cellId,
      rows: rows,
      rowId: rowId
    }
  };

  handleContainerMouseEnter = () => {
    clearTimeout(this.timer)
  };

  handleContainerMouseLeave = () => {
    this.timer = setTimeout(() => {
      this.showDelButtons(false);
    }, 100);
  };

  handleTableMouseEnter = () => {
    this.showDelButtons(true);
  };

  handleTableMouseOver = ({ target }) => {
    if (target.tagName === "TD") {
      const delRowButton = this.state.delRowButton;
      const delColButton = this.state.delColButton;
      const parentBorder = parseInt(getComputedStyle(target.offsetParent).borderWidth);
      this.setState({
        delRowButton: { ...delRowButton, position: target.offsetTop + parentBorder},
        delColButton: { ...delColButton, position: target.offsetLeft + parentBorder},
        colIndex: target.cellIndex,
        rowIndex: target.closest("tr").rowIndex
      })
    }
  };

  showDelButtons = (show) => {
    const delRowButton = this.state.delRowButton;
    const delColButton = this.state.delColButton;
    this.setState({
      delRowButton: {...delRowButton, show: this.state.rows.length > 1 && show ? show : false},
      delColButton: {...delColButton, show: this.state.cells.length > 1 && show ? show : false}
    })
  };

  addRow = () => {
    const rowsCopy = this.state.rows;
    let rowId = this.state.rowId;
    const newRows = [...rowsCopy, rowId++];
    this.setState({ rows: newRows, rowId: rowId })
  };

  addCol = () => {
    const cellsCopy = this.state.cells;
    let cellId = this.state.cellId;
    const newCells = [...cellsCopy, cellId++];
    this.setState({ cells: newCells, cellId: cellId })
  };

  delRow = () => {
    this.setState(() => {
      const newRows = this.state.rows;
      newRows.splice(this.state.rowIndex, 1);
      return { rows: newRows }
    });
    this.showDelButtons();
  };

  delCol = () => {
    this.setState(() => {
      const newCells = this.state.cells;
      newCells.splice(this.state.colIndex, 1);
      return { cells: newCells }
    });
    this.showDelButtons();
  };

  render() {
    return (
      <div className="table-container"
        onMouseEnter={this.handleContainerMouseEnter}
        onMouseLeave={this.handleContainerMouseLeave}>
        <Table rows={this.state.rows}
                cells={this.state.cells}
                size={this.props.cellSize}
                onMouseEnter={this.handleTableMouseEnter}
                onMouseOver={this.handleTableMouseOver} />
        <Button className={"table__button_add-row"}
                size={this.props.cellSize}
                onClick={this.addRow}>+</Button>
        <Button className={"table__button_add-col"}
                size={this.props.cellSize}
                onClick={this.addCol}>+</Button>
        <Button className={"table__button_del-row"}
                size={this.props.cellSize}
                show={this.state.delRowButton.show}
                position={{ top: this.state.delRowButton.position }}
                onClick={this.delRow}>-</Button>
        <Button className={"table__button_del-col"}
                size={this.props.cellSize}
                show={this.state.delColButton.show}
                position={{ left: this.state.delColButton.position }}
                onClick={this.delCol}>-</Button>
      </div>
    );
  }
}

export default TableContainer;
