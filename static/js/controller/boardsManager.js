import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(
                `[data-board-id="${board.id}"]>.board-header>.board-remove`,
                'click',
                deleteButtonHandler
            );
            domManager.addEventListener(
                `.board-add[data-board-id="${board.id}"]`,
                'click',
                createCardHandler
            )
            domManager.addEventListener(
                '.board-title',
                'dblclick',
                renameBoard
            )
            domManager.addEventListener(
                '.card-title',
                'dblclick',
                renameCard

            )
        }
    },
};

function showHideButtonHandler(clickEvent) {

    const boardId = clickEvent.target.dataset.boardId;
    const columnsRow = document.querySelector(`.board-columns[data-boardcolumns-id="${boardId}"]`)
    if (columnsRow.dataset.clicked === 'false') {
        cardsManager.loadCards(boardId);
        columnsRow.style.display = "flex";
        columnsRow.dataset.clicked = 'true';
    } else {
        const boardColumnContents = document.querySelectorAll(`.board-column-content[data-board-id="${boardId}"]`)
        boardColumnContents.forEach(function (boardColumnContent) {
           boardColumnContent.replaceChildren()
        });
        columnsRow.style.display = "none";
        columnsRow.dataset.clicked = 'false';
    }
    console.log('headje a kattintott tablenek', columnsRow)

}

function deleteButtonHandler(clickEvent) {
    const board = clickEvent.currentTarget.parentNode.parentNode;
    board.classList.add('inactive');
    dataHandler.deleteBoard(board.dataset.boardId)
}

function createCardHandler(clickEvent) {
    let boardId = clickEvent.target.dataset.boardId
    const columnsRow = document.querySelector(`.board-columns[data-boardcolumns-id="${boardId}"]`)
    let statusId = 1
    let cardTitle = 'New card'
    dataHandler.createNewCard(cardTitle, boardId, statusId)
    const boardColumnContents = document.querySelectorAll(`.board-column-content[data-board-id="${boardId}"]`)
        boardColumnContents.forEach(function (boardColumnContent) {
           boardColumnContent.replaceChildren()
        });
    cardsManager.loadCards(boardId);
        columnsRow.style.display = "flex";
        columnsRow.dataset.clicked = 'true';
}

function renameBoard(clickEvent) {
    let boardTitle = clickEvent.currentTarget.value
    console.log('title', boardTitle)
}

function renameCard(clickEvent) {
    let cardTitle = clickEvent.currentTarget.value
    console.log('title', cardTitle)
}