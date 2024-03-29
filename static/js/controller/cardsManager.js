import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {

            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content[data-board-id="${boardId}"][data-status="${card.status_id}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]>.card-remove`,
                "click",
                deleteButtonHandler
            );
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                'dragstart',
                handleDragStart
            );
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                'dragend',
                handleDragEnd
            );
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]>.card-title`,
                'dblclick',
                renameCardHandler
            )
        }
    },
};

function deleteButtonHandler(clickEvent) {
    const card = clickEvent.currentTarget.parentNode;
    card.classList.add('inactive');
    dataHandler.deleteCard(card.dataset.cardId);
}


function handleDragStart(e) {
    this.style.opacity = '0.4';
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

export function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function renameCardHandler(clickEvent) {
    let cardId = clickEvent.currentTarget.parentNode.dataset.cardId
    let rename = clickEvent.currentTarget
    let currentName = rename.innerHTML
    let input = document.createElement('input')
    input.id = 'rename-card'
    input.type = 'text'
    input.placeholder = currentName
    if (this.firstElementChild === null) {
        this.appendChild(input)
    }
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            if (input.value === ''){
                input.value = currentName
                dataHandler.renameCard(cardId, input.value)
            }
            let cardTitle = input.value
            let newName = cardTitle
            rename.innerHTML = newName
            dataHandler.renameCard(cardId, rename.innerHTML)
        }
    })
}

