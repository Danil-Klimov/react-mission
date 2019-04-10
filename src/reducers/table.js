const initialState = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
};

export default function (state = initialState, action) {
    switch (action.type){
        case 'ADD_ROW':
            return state = action.payload;
        case 'ADD_COL':
            return state = action.payload;
        default:
            return state
    }
};