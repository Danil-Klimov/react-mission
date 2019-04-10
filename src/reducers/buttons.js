const initialState = [
    {mainClass: "table__button_add", actionClass: "table__button_add-row", text: "+", key: 1},
    {mainClass: "table__button_add", actionClass: "table__button_add-col", text: "+", key: 2},
    {mainClass: "table__button_del", actionClass: "table__button_del-row", text: "–", key: 3},
    {mainClass: "table__button_del", actionClass: "table__button_del-col", text: "–", key: 4}
];

export default function (state = initialState) {
    return state;
};