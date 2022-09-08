// import {dataHandler} from "../data/dataHandler.js";
// import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
// import {domManager} from "../view/domManager.js";
//
//
// export let statusManager = {
//     loadStatuses: async function (board, boardId) {
//         const statusBuilder = htmlFactory(htmlTemplates.status);
//         const statuses = await dataHandler.getStatuses(boardId);
//         const columns = statusBuilder(board, statuses);
//         columns.forEach(column => domManager.addChild(`.board[data-board-id="${board.id}"]`, column));
//     }
// }