import React, { Component } from 'react';
import './App.scss';
import TableContainer from './components/TableContainer';

class App extends Component {
  static defaultProps = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
  };

  render() {
    return (
      <TableContainer initialWidth={this.props.initialWidth}
                      initialHeight={this.props.initialHeight}
                      cellSize={this.props.cellSize}/>
    );
  }
}

export default App;
