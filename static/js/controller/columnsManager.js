import {dataHandler} from "../data/dataHandler.js";


export let columnsManager = {
    columnEvents: async function () {
        const columnDeleteButtons = document.querySelectorAll('.column-remove');
        columnDeleteButtons.forEach(button => button.addEventListener('click', deleteButtonHandler))
    }
};

function deleteButtonHandler(clickEvent) {
    const column = clickEvent.currentTarget.parentNode.parentNode;
    column.classList.add('inactive');
    dataHandler.deleteStatus(column.dataset.columnStatus)

}