import React, { Component } from 'react';
import './App.scss';
import TableContainer from './components/TableContainer';

class App extends Component {
  render() {
    return (
      <TableContainer initialWidth={4}
                      initialHeight={4}
                      cellSize={50}/>
    );
  }
}

export default App;
