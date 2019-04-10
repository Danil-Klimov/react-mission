export default function addCol(initialWidth, initialHeight) {
    return {
        type: 'ADD_COL',
        payload: {
            initialWidth: initialWidth,
            initialHeight: initialHeight,
            cellSize: 50
        }
    }
}