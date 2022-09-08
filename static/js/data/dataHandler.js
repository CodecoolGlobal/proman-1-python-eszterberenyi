export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    deleteBoard: async function (boardId) {
        return await apiDelete(`/api/boards/${boardId}`)
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        let card = {}

        card.cardTitle = cardTitle
        card.boardId = boardId
        card.statusId = statusId
        console.log('card', card)
        await apiPost('/api/cards/create', card)
    },
    deleteCard: async function (cardId) {
        return await apiDelete(`/api/boards/cards/${cardId}`)
    },
    renameCard: async function (cardId, cardTitle) {
        let rename = {}

        rename.cardId = cardId
        rename.cardTitle = cardTitle
        console.log('rename', rename)
        return await apiPatch('/api/cards/rename', rename)

    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    console.log('apiPost', url, payload)
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log('in response',payload);

    if (response.ok) {
        return await response.json();
    }

}

async function apiDelete(url) {
    let response = await fetch(url, {
        method: "DELETE",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPut(url) {
}

async function apiPatch(url, payload) {
    console.log(url, payload)
    let response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(payload)
    if (response.ok) {
        return await response.json();
    }

}
