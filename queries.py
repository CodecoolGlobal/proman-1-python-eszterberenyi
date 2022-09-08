import data_manager


def get_card_status(status_id):

    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_statuses_for_board(board_id):
    statuses = data_manager.execute_select(
        """
        SELECT * FROM statuses WHERE board_id = %(board_identifier)s
        ORDER BY column_order
        ;
        """
        , {'board_identifier': board_id}
    )
    return statuses


def get_boards():

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def create_card_for_board_status(card):
    return data_manager.execute_select(
        """
            INSERT INTO cards (board_id, status_id, title, user_id, card_order)
            VALUES (%(board_id)s, %(status_id)s, %(title)s, 1, (SELECT
            COALESCE(MAX(card_order),0)+1 FROM cards WHERE board_id=%(board_id)s AND status_id=%(status_id)s))
            RETURNING id;
        """,
        {
            'board_id': card['boardId'],
            'status_id': card['statusId'],
            'title': card['cardTitle'],
        }
    )


def create_user(username, password):
    new_user = data_manager.execute_select(
        """
        INSERT INTO users(user_name, password)
        VALUES (%(name)s, %(pwd)s)
        RETURNING id;
        """, {"name": username, "pwd": password})
    return new_user


def get_user(username):
    user = data_manager.execute_select(
        """
        SELECT * FROM users
        WHERE user_name = %(name)s
        """, {"name": username}, False)
    return user


def delete_card(card_id):
    deleted_card = data_manager.execute_select(
        """
        DELETE FROM cards WHERE id = %(card_identifier)s
        RETURNING id;
        """
        , {'card_identifier': card_id}, False)
    return deleted_card


def delete_column(status_id):
    deleted_column = data_manager.execute_select(
        """
        DELETE FROM statuses WHERE id = %(status_id)s
        RETURNING id;
        """
        , {'status_id': status_id}, False)
    return deleted_column


def delete_board(board_id):
    deleted_board = data_manager.execute_select(
        """
        DELETE FROM boards WHERE id = %(board_identifier)s
        RETURNING id;
        """
        , {'board_identifier': board_id}, False)
    return deleted_board
