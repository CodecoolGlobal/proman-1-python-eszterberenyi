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
                `.board-add[data-board-id="${board.id}"]`,
                'click',
                createCardHandler
            )
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

function createCardHandler(clickEvent) {
    const createButton = clickEvent.target
    let boardId = createButton.dataset.boardId
    let statusId = 1
    let cardTitle = 'New card'
    console.log('aaaaaa')
    dataHandler.createNewCard(cardTitle, boardId, statusId)
}