import React, { Component } from 'react';
import './App.scss';
import Table from "./components/Table";
import Button from "./components/Button"

class App extends Component {
    state = {
                colIndex: null,
                rowIndex: null,
                table: Array(this.props.initialHeight).fill(Array(this.props.initialWidth).fill("")),
                // table: [
                //     ['','','',''],
                //     ['','','',''],
                //     ['','','',''],
                //     ['','','','']
                // ],
                buttons: [
                    {
                        className: "table__button table__button_add table__button_add-row",
                        text: "+"},
                    {
                        className: "table__button table__button_add table__button_add-col",
                        text: "+"},
                    {
                        className: "table__button table__button_del table__button_del-row",
                        showClass: "show",
                        show: false,
                        text: "–",
                        position: {top: 3 + "px"}},
                    {
                        className: "table__button table__button_del table__button_del-col",
                        showClass: "show",
                        show: false,
                        text: "–",
                        position: {left: 3 + "px"}},
                ],
                showDelButtons: false
            };
    createButtons = () => {
        return this.state.buttons.map((item, index) => {
            return <Button key={index}
                           className={"showClass" in item && this.state.showDelButtons ? `${item.className} ${item.showClass}` : `${item.className}`}
                           text={item.text}
                           style={Object.assign({width: this.props.cellSize + "px", height: this.props.cellSize + "px"}, item.position)}/>

        })
    };
    handleClick = ({target}) => {
        if(target.classList.contains("table__button_add-row")) {
            this.addRow();
        }
        if(target.classList.contains("table__button_add-col")) {
            this.addCol();
        }
        if(target.classList.contains("table__button_del-row")) {
            this.delRow();
            this.showDelButtons();
        }
        if(target.classList.contains("table__button_del-col")) {
            this.delCol();
            this.showDelButtons();
        }
    };
    handleTableMouseEnter = () => {
        if(!this.state.showDelButtons) {
            this.showDelButtons();
        }
    };
    handleContainerMouseEnter = () => {
        clearTimeout(this.timer)
    };
    handleContainerMouseLeave = () => {
        if(this.state.showDelButtons) {
            this.timer = setTimeout(() => {
                this.showDelButtons();
            }, 100);
        }
    };
    handleTableMouseOver = ({target}) => {
        if(target.tagName === "TD") {
            this.moveDelButtons(target);
        }
    };
    showDelButtons = () => {
        this.setState({showDelButtons: !this.state.showDelButtons});
    };
    moveDelButtons = (target) => {
        const targetLeftPosition = target.getBoundingClientRect().left;
        const targetTopPosition = target.getBoundingClientRect().top;
        const buttons = [...this.state.buttons];
        buttons.map((item, index) => {
            if("showClass" in item) {
                if("top" in item.position) {
                    buttons[index].position = {top: targetTopPosition - this.tableContainer.offsetTop + window.pageYOffset + "px"};
                }
                if("left" in item.position) {
                    buttons[index].position = {left: targetLeftPosition - this.tableContainer.offsetLeft + window.pageXOffset + "px"};
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
        this.setState((prevState) => {
            const newRow = prevState.table[prevState.table.length - 1].slice();
            prevState.table.push(newRow);
            return {table: prevState.table}
        });
    };
    addCol = () => {
        this.setState((prevState) => {
            const newTable = [];
            prevState.table.forEach((item) => {
                newTable.push(item.concat(""));
            });
            return {table: newTable}
        });
    };
    delRow = () => {
        this.setState((prevState) => {
            prevState.table.splice(prevState.rowIndex, 1);
            return {table: prevState.table}
        })
    };
    delCol = () => {
        this.setState((prevState) => {
            prevState.table.forEach((item, index) => {
                item.splice(prevState.colIndex, 1);
                // console.log(item, index)
            });
            return {table: prevState.table}
        });
    };
    render() {
        // console.log(this.state.buttons[2].position);
        return (
            <div className="table-container"
                 onClick={this.handleClick}
                 onMouseEnter={this.handleContainerMouseEnter}
                 onMouseLeave={this.handleContainerMouseLeave}
                 ref={(node => {this.tableContainer = node})}>
                <Table table={this.state.table}
                       size={this.props.cellSize}
                       onMouseEnter={this.handleTableMouseEnter}
                       onMouseOver={this.handleTableMouseOver}/>
                {this.createButtons()}
            </div>
        );
    }
}

export default App;
