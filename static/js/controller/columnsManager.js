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
    input.placeholder = rename.innerText
    if (this.children.length === null) {
        this.appendChild(input)
    //    need to appen input !!!!!!!!!!!
    }
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            if (input.value === '') {
                input.value = currentName
                dataHandler.renameColumn(columnId, rename.innerHTML)
            }
            let boardTitle = input.value
            let new_name = boardTitle
            rename.innerHTML = new_name
            dataHandler.renameColumn(columnId, rename.innerHTML)
        }

    })

}