import {dataHandler} from "../data/dataHandler.js";


export let columnsManager = {
    columnEvents: async function () {
        const columnDeleteButtons = document.querySelectorAll('.column-remove');
        columnDeleteButtons.forEach(button => button.addEventListener('click', deleteButtonHandler))
        const columnTitles = document.querySelectorAll('.board-column-title');
        columnTitles.forEach(title => title.addEventListener('dblclick', renameColumnTitle))
    }
};

function deleteButtonHandler(clickEvent) {
    const column = clickEvent.currentTarget.parentNode.parentNode;
    column.classList.add('inactive');
    dataHandler.deleteStatus(column.dataset.columnStatus)

}


function renameColumnTitle(clickEvent) {
    let columnId = clickEvent.currentTarget.parentNode.dataset.columnStatus
    console.log(columnId)
    let rename = clickEvent.currentTarget.innerText
    console.log(rename)
    console.log(this.children.length)
    let currentName = rename.innerText
    let input = document.createElement('input')
    input.id = 'rename-column'
    input.type = 'text'
    input.placeholder = rename
    if (this.children.length === 1) {
        this.appendChild(input)
    }
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            if (input.value === '') {
                input.value = currentName
                dataHandler.renameColumn(columnId, input.value)
            }
            let boardTitle = input.value
            dataHandler.renameColumn(columnId, boardTitle)
        }

    })

}