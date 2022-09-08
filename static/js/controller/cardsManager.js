import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content[data-board-id="${boardId}"][data-board-status="${card.status_id}"]`, content);
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
    console.log(card)
    card.classList.add('inactive');
    dataHandler.deleteCard(card.dataset.cardId);
}


function handleDragStart(e) {
    this.style.opacity = '0.4';
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

function handleDragOver(e) {
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
    let cardTitle = clickEvent.target.innerHTML
    let input = document.createElement('input')
    input.id = 'rename-card'
    input.type = 'text'
    input.placeholder = 'New name'
    this.appendChild(input)
    input.addEventListener('keyup', (event) =>{
        input.parentNode.removeChild(input)
    })


    // input.focusin = function () {
    //     cardTitle = input.value
    //     let new_name = cardTitle
    //     this.parentNode.innerHTML = new_name;
    // }





// let input = document.createElement('input')
// input.onfocus = function () {
//     cardTitle = input.value
//     let new_name = cardTitle
//     this.parentNode.innerHTML = new_name;
// }
// input.focusout()


    console.log('aaaaaaa', cardTitle, cardId)
    dataHandler.renameCard(cardId, cardTitle)
}

