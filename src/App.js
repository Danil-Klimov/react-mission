import React, { Component } from 'react';
import './App.scss';
import Table from "./components/Table";
import Button from "./components/Button"

class App extends Component {
  static defaultProps = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
  };
  constructor(props) {
    super(props);
    let rowId = this.state.rows.id;
    const initialRows = Array(this.props.initialHeight).fill('');
    const rows = initialRows.map((row) => {
      return row = rowId++;
    });
    let cellId = this.state.cells.id;
    const initialCells = Array(this.props.initialWidth).fill('');
    const cells = initialCells.map((cell) => {
      return cell = cellId++;
    });
    this.state = {
      ...this.state,
      cells: { cellsArray: cells, id: cellId },
      rows: { rowsArray: rows, id: rowId }
    }
  }
  state = {
    colIndex: null,
    rowIndex: null,
    delRowButton: {
      show: false,
      position: "3px"
    },
    delColButton: {
      show: false,
      position: "3px"
    },
    rows: {
      rowsArray: [],
      id: 0
    },
    cells: {
      cellsArray: [],
      id: 0
    }
  };

  handleTableMouseEnter = () => {
    this.showDelButtons(true);
  };

  handleContainerMouseEnter = () => {
    clearTimeout(this.timer)
  };

  handleContainerMouseLeave = () => {
    this.timer = setTimeout(() => {
      this.showDelButtons(false);
    }, 100);
  };

  handleTableMouseOver = ({ target }) => {
    if (target.tagName === "TD") {
      const delRowButton = this.state.delRowButton;
      const delColButton = this.state.delColButton;
      this.setState({
        delRowButton: { ...delRowButton, position: target.offsetTop },
        delColButton: { ...delColButton, position: target.offsetLeft },
        colIndex: target.cellIndex,
        rowIndex: target.closest("tr").rowIndex
      })
    }
  };

  showDelButtons = (show) => {
    const delRowButton = this.state.delRowButton;
    const delColButton = this.state.delColButton;
    let newDelRowButton;
    let newDelColButton;
    this.state.rows.rowsArray.length > 1 && show ? newDelRowButton = { ...delRowButton, show: true } : newDelRowButton = { ...delRowButton, show: false };
    this.state.cells.cellsArray.length > 1 && show ? newDelColButton = { ...delColButton, show: true } : newDelColButton = { ...delColButton, show: false };
    this.setState({
      delRowButton: newDelRowButton,
      delColButton: newDelColButton
    })
  };

  addRow = () => {
    const rowsCopy = this.state.rows.rowsArray;
    let rowId = this.state.rows.id;
    const newRows = [...rowsCopy, rowId++]
    this.setState({ rows: { rowsArray: newRows, id: rowId }})
  };

  addCol = () => {
    const cellsCopy = this.state.cells.cellsArray;
    let cellId = this.state.cells.id;
    const newCells = [...cellsCopy, cellId++]
    this.setState({ cells: { cellsArray: newCells, id: cellId } })
  };

  delRow = () => {
    this.setState(() => {
      const newRows = this.state.rows;
      newRows.rowsArray.splice(this.state.rowIndex, 1);
      return { rows: newRows }
    });
    this.showDelButtons();
  };

  delCol = () => {
    this.setState(() => {
      const newCells = this.state.cells;
      newCells.cellsArray.splice(this.state.colIndex, 1);
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
                table={this.state.table}
                size={this.props.cellSize}
                onMouseEnter={this.handleTableMouseEnter}
                onMouseOver={this.handleTableMouseOver} />
        <Button className={"table__button_add table__button_add-row"}
                text={"+"}
                style={{ width: this.props.cellSize + "px", height: this.props.cellSize + "px"}}
                onClick={this.addRow}/>
        <Button className={"table__button_add table__button_add-col"}
                text={"+"}
                style={{ width: this.props.cellSize + "px", height: this.props.cellSize + "px" }}
                onClick={this.addCol}/>
        <Button className={!this.state.delRowButton.show ? "table__button_del table__button_del-row" : "table__button_del table__button_del-row show"}
                text={"-"}
                style={{ width: this.props.cellSize + "px", height: this.props.cellSize + "px", top: this.state.delRowButton.position }}
                onClick={this.delRow}/>
        <Button className={!this.state.delColButton.show ? "table__button_del table__button_del-col" : "table__button_del table__button_del-col show"}
                text={"-"}
                style={{ width: this.props.cellSize + "px", height: this.props.cellSize + "px", left: this.state.delColButton.position }}
                onClick={this.delCol}/>
      </div>
    );
  }
}

export default App;
