import React, { Component } from 'react';
import './App.scss';
import Table from "./components/Table";
import Button from "./components/Button"

class App extends Component {
  state = {
    colIndex: null,
    rowIndex: null,
    buttons: [
      {
        className: "table__button table__button_add table__button_add-row",
        text: "+"
      },
      {
        className: "table__button table__button_add table__button_add-col",
        text: "+"
      },
      {
        className: "table__button table__button_del table__button_del-row",
        showClass: "show",
        show: false,
        text: "–",
        position: { top: 3 + "px" }
      },
      {
        className: "table__button table__button_del table__button_del-col",
        showClass: "show",
        show: false,
        text: "–",
        position: { left: 3 + "px" }
      },
    ],
    showDelButtons: false,
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

  createButtons = () => {
    return this.state.buttons.map((item, index) => {
      return <Button key={index}
        className={"showClass" in item && item.show ? `${item.className} ${item.showClass}` : `${item.className}`}
        text={item.text}
        style={Object.assign({ width: this.props.cellSize + "px", height: this.props.cellSize + "px" }, item.position)} />

    })
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
    const buttons = this.state.buttons;
    const newButtons = buttons.map((item) => {
      if("show" in item) {
        if (("top" in item.position && this.state.table.length > 1 && show) || ("left" in item.position && this.state.table[0].row.length > 1 && show)) {
          return { ...item, show: true}
        }
        return { ...item, show: false }
      }
      return item
    });
    this.setState({ buttons: newButtons });
  };

  moveDelButtons = (target) => {
    const targetLeftPosition = target.getBoundingClientRect().left;
    const targetTopPosition = target.getBoundingClientRect().top;
    const buttons = this.state.buttons;
    buttons.map((item, index) => {
      if ("showClass" in item) {
        if ("top" in item.position) {
          buttons[index].position = { top: targetTopPosition - this.tableContainer.offsetTop + window.pageYOffset + "px" };
        }
        if ("left" in item.position) {
          buttons[index].position = { left: targetLeftPosition - this.tableContainer.offsetLeft + window.pageXOffset + "px" };
        }
      }
      return this.setState({
        buttons,
        colIndex: target.cellIndex,
        rowIndex: target.closest("tr").rowIndex
      })
    });
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
      return this.setState({table: newTable, id: newId})
    });
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
      return this.setState({table: newTable})
    })
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
        {this.createButtons()}
      </div>
    );
  }
}

export default App;
