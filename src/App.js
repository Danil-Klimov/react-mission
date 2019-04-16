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
    setId: () => Math.random().toString(16)
  };

  componentWillMount() {
    const initialTable = Array(this.props.initialHeight).fill({ row: Array(this.props.initialWidth).fill({ cellText: "" }) });
    const newTable = initialTable.map((item) => {
      const row = item.row.map((item) => {
        return {...item, id: this.state.setId()}
      })
      return { row, id: this.state.setId()}
    })
    this.setState({table: newTable});
  };

  createButtons = () => {
    return this.state.buttons.map((item, index) => {
      return <Button key={index}
        className={"showClass" in item && this.state.showDelButtons ? `${item.className} ${item.showClass}` : `${item.className}`}
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
    if (!this.state.showDelButtons) {
      this.showDelButtons();
    }
  };

  handleContainerMouseEnter = () => {
    clearTimeout(this.timer)
  };

  handleContainerMouseLeave = () => {
    if (this.state.showDelButtons) {
      this.timer = setTimeout(() => {
        this.showDelButtons();
      }, 100);
    }
  };

  handleTableMouseOver = ({ target }) => {
    if (target.tagName === "TD") {
      this.moveDelButtons(target);
    }
  };

  showDelButtons = () => {
    this.setState({ showDelButtons: !this.state.showDelButtons });
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
    const row = rowCopy.row.map((item) => {
      return { ...item, id: this.state.setId() }
    })
    const newTable = [...this.state.table, {row, id: this.state.setId()}];
    this.setState({ table: newTable });
  };

  addCol = () => {
    const newTable = this.state.table;
    newTable.map((item) => {
      const newCell = { ...item.row[item.row.length - 1] }
      newCell.id = this.state.setId();
      item.row = [...item.row, newCell];
      return this.setState({table: newTable})
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
