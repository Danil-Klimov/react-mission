import { combineReducers } from 'redux';

import buttons from './buttons';
import table from "./table";

const rootReducer = combineReducers({
    buttons,
    table
});

export default rootReducer;