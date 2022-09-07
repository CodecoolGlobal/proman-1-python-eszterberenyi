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


def delete_card(card_id):
    deleted_card = data_manager.execute_select(
        """
        DELETE FROM cards WHERE id = %(card_identifier)s
        RETURNING id;
        """
        , {'card_identifier': card_id}, False)
    return deleted_card


def delete_board(board_id):
    deleted_board = data_manager.execute_select(
        """
        DELETE FROM boards WHERE id = %(board_identifier)s
        RETURNING id;
        """
        , {'board_identifier': board_id}, False)
    return deleted_board
