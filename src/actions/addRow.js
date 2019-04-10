export default function addRow(initialHeight, initialWidth) {
    return {
        type: 'ADD_ROW',
        payload: {
            initialWidth: initialWidth,
            initialHeight: initialHeight,
            cellSize: 50
        }
    }
}