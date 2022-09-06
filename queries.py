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
        WHERE username = %(name)s
        """, {"name": username}, False)
    return user
