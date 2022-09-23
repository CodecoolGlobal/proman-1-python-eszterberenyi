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
    column.remove()
    dataHandler.deleteStatus(column.dataset.columnStatus)

}


function renameColumnTitle(clickEvent) {
    let columnId = clickEvent.currentTarget.parentNode.dataset.columnStatus
    let rename = clickEvent.currentTarget
    let currentName = rename.innerText
    let input = document.createElement('input')
    input.id = 'rename-column'
    input.type = 'text'
    input.placeholder = currentName
    if (this.children.length === 1) {
        this.append(input)
    }
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            if (input.value === '') {
                rename.innerText = currentName
                rename.insertAdjacentHTML('beforeend', ' <i class="fas fa-trash-alt column-remove">')
            } else {
                rename.innerText = input.value
                rename.insertAdjacentHTML('beforeend', ' <i class="fas fa-trash-alt column-remove">')
                dataHandler.renameColumn(columnId, rename.innerText)
            }
        }

    })

}