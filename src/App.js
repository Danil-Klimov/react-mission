import React, { Component } from 'react';
import './App.scss';
import Table from "./components/Table";
import Button from "./components/Button"

class App extends Component {
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
    id: 1
  };

  componentWillMount() {
    const initialTable = Array(this.props.initialHeight).fill({ row: Array(this.props.initialWidth).fill({ cellText: "" }) });
    let newId = this.state.id;
    const newTable = initialTable.map((item) => {
      const row = item.row.map((item) => {
        return {...item, id: newId++}
      })
      return { row, id: newId++}
    })
    this.setState({table: newTable, id: newId});
  };

  handleClick = ({ target }) => {
    if (target.classList.contains("table__button_add-row")) {
      this.addRow();
    }
    if (target.classList.contains("table__button_add-col")) {
      this.addCol();
    }
    if (target.classList.contains("table__button_del-row")) {
      this.delRow();
      this.showDelButtons();
    }
    if (target.classList.contains("table__button_del-col")) {
      this.delCol();
      this.showDelButtons();
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
      this.moveDelButtons(target);
    }
  };

  showDelButtons = (show) => {
    const delRowButton = this.state.delRowButton;
    const delColButton = this.state.delColButton;
    let newDelRowButton;
    let newDelColButton;
    this.state.table.length > 1 && show ? newDelRowButton = { ...delRowButton, show: true } : newDelRowButton = { ...delRowButton, show: false };
    this.state.table[0].row.length > 1 && show ? newDelColButton = { ...delColButton, show: true } : newDelColButton = { ...delColButton, show: false };
    this.setState({
      delRowButton: newDelRowButton,
      delColButton: newDelColButton
    })
  };

  moveDelButtons = (target) => {
    const targetLeftPosition = target.getBoundingClientRect().left;
    const targetTopPosition = target.getBoundingClientRect().top;
    const delRowButton = this.state.delRowButton;
    const delColButton = this.state.delColButton;
    this.setState({
      delRowButton: { ...delRowButton, position: targetTopPosition - this.tableContainer.offsetTop + window.pageYOffset + "px"},
      delColButton: { ...delColButton, position: targetLeftPosition - this.tableContainer.offsetLeft + window.pageXOffset + "px"},
      colIndex: target.cellIndex,
      rowIndex: target.closest("tr").rowIndex
    })
  };

  addRow = () => {
    const rowCopy = this.state.table[this.state.table.length - 1];
    let newId = this.state.id;
    const row = rowCopy.row.map((item) => {
      newId++
      return { ...item, id: newId }
    })
    const newTable = [...this.state.table, {row, id: newId++}];
    this.setState({ table: newTable, id: newId });
  };

  addCol = () => {
    const newTable = this.state.table;
    let newId = this.state.id;
    newTable.map((item) => {
      const newCell = { ...item.row[item.row.length - 1] }
      newCell.id = newId++;
      item.row = [...item.row, newCell];
      return newTable;
    });
    this.setState({ table: newTable, id: newId });
  };

  delRow = () => {
    this.setState(() => {
      const newTable = this.state.table;
      newTable.splice(this.state.rowIndex, 1);
      return { table: newTable }
    })
  };

  delCol = () => {
    const newTable = this.state.table;
    newTable.map((item) => {
      item.row.splice(this.state.colIndex, 1);
      return newTable
    });
    this.setState({ table: newTable });
  };

  render() {
    return (
      <div className="table-container"
        onClick={this.handleClick}
        onMouseEnter={this.handleContainerMouseEnter}
        onMouseLeave={this.handleContainerMouseLeave}
        ref={(node => { this.tableContainer = node })}>
        <Table table={this.state.table}
          size={this.props.cellSize}
          onMouseEnter={this.handleTableMouseEnter}
          onMouseOver={this.handleTableMouseOver} />
        <Button className={"table__button_add table__button_add-row"}
                text={"+"}
                style={{ width: this.props.cellSize + "px", height: this.props.cellSize + "px"}}/>
        <Button className={"table__button_add table__button_add-col"}
                text={"+"}
                style={{ width: this.props.cellSize + "px", height: this.props.cellSize + "px" }}/>
        <Button className={!this.state.delRowButton.show ? "table__button_del table__button_del-row" : "table__button_del table__button_del-row show"}
                text={"-"}
                style={{ width: this.props.cellSize + "px", height: this.props.cellSize + "px", top: this.state.delRowButton.position }}/>
        <Button className={!this.state.delColButton.show ? "table__button_del table__button_del-col" : "table__button_del table__button_del-col show"}
                text={"-"}
                style={{ width: this.props.cellSize + "px", height: this.props.cellSize + "px", left: this.state.delColButton.position }}/>
      </div>
    );
  }
}

export default App;
