import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

App.defaultProps = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
