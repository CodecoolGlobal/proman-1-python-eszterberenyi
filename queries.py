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


def create_card_for_board_status(card):
    data_manager.execute_select(
        """
            INSERT INTO cards (board_id, status_id, title, user_id, card_order)
            VALUES (%(board_id)s, %(status_id)s, %(title)s, 1, (SELECT
            COALESCE(MAX(card_order),0)+1 FROM cards WHERE board_id=%(board_id)s AND status_id=%(status_id)s));
        """,
        {
            'board_id': card['boardId'],
            'status_id': card['statusId'],
            'title': card['cardTitle'],
        }
    )


# def get_user_data():
#     data_manager.execute_select(
#         """
#             SELECT * FROM users;
#         """
#     )
#
#
# def get_user_id_by_name(user_name):
#     data_manager.execute_select(
#         """
#             SELECT id
#             FROM users
#             WHERE user_name=%(user_name)s
#         """,
#         {'user_name': user_name}
#
#     )
