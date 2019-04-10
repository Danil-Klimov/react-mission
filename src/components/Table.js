import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);
        this.createTable = () => {
            return this.props.table.map((element, index) => {
                return <tr key={index}>{element.map((item, i) => {
                    return <td key={i} style={{width: this.props.size + 'px', height: this.props.size + 'px'}}>{item}</td>
                })}</tr>
            })
        };
    }

    render() {
        return (
            <table className="table"
                   onMouseEnter={this.props.onMouseEnter}
                   onMouseOver={this.props.onMouseOver}
                   ref={(node => {this.table = node})}>
                <tbody>
                    {this.createTable()}
                </tbody>
            </table>
        );
    }

}

export default Table;