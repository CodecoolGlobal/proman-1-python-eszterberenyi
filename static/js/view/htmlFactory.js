export const htmlTemplates = {
    board: 1,
    card: 2,
    status: 3
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.status]: statusBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<section class="board" data-board-id=${board.id}>
                <div class="board-header">
                    <div class="board-title" data-board-id=${board.id}>${board.title}</div>
                    <button class="board-add btn btn-dark mx-auto" data-board-id="${board.id}">Add Card</button>
                    <button class="toggle-board-button board-toggle btn btn-dark mx-xxl-5" data-board-id="${board.id}">Show Cards
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="board-remove btn">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
                <div class="board-columns" data-boardcolumns-id=${board.id} data-clicked="false"></div>
            </section>`;
}

function statusBuilder(board, statuses) {
    const columns = [];
    for (let status of statuses) {
        let title = capitalizeFirstLetter(status.title)
        const column = `<div class="board-column" data-column-status=${status.id}>
                                <div class="board-column-title">${title} <i class="fas fa-trash-alt column-remove"></i> </div>
                                <div class="board-column-content" data-board-id="${board.id}" data-status=${status.id} data-order=${status.column_order}></div>
                        </div>`
        columns.push(column)
    }
    return columns
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" data-card-status="${card.status_id}" draggable="true">
                <div class="card-remove">
                    <i class="fas fa-trash-alt" data-card-id="${card.id}">
                    
                    </i>
                </div>
                <div class="card-title">${card.title}</div>
            </div>`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}