export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
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
                    <span class="board-title">${board.title}</span>
                    <button class="board-add btn btn-dark">Add Card</button>
                     <div class="board-remove"><i class="fas fa-trash-alt"></i></div>
                    <button class="toggle-board-button board-toggle btn btn-dark" data-board-id="${board.id}">Show Cards
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="board-columns" data-boardcolumns-id=${board.id} data-clicked="false">
                    <div class="board-column">
                        <div class="board-column-title">New</div>
                        <div id="${board.id}-board-status-new" class="board-column-content" data-board-id="${board.id}" data-board-status="1">
                        </div>
                    </div>
                    <div class="board-column">
                        <div class="board-column-title">In progress</div>
                        <div id="${board.id}-board-status-inprogress" class="board-column-content" data-board-id="${board.id}" data-board-status="2">
                        </div>
                    </div>
                    <div class="board-column">
                        <div class="board-column-title">Testing</div>
                        <div id="${board.id}-board-status-testing" class="board-column-content" data-board-id="${board.id}" data-board-status="3">
                        </div>
                    </div>
                    <div class="board-column">
                        <div class="board-column-title">Done</div>
                        <div id="${board.id}-board-status-done" class="board-column-content" data-board-id="${board.id}" data-board-status="4">
                        </div>
                    </div>
                </div>
            </section>`;
}

function cardBuilder(card) {
    console.log(card);
    return `<div class="card" data-card-id="${card.id}" data-card-status="${card.status_id}" draggable="true">
                <div class="card-remove">
                    <i class="fas fa-trash-alt" data-card-id="${card.id}">
                    
                    </i>
                </div>
                <div class="card-title">${card.title}</div>
            </div>`;
}

