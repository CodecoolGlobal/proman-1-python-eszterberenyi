from flask import Flask, render_template, url_for, session, request, redirect
from psycopg2.errors import UniqueViolation
from datetime import timedelta
from dotenv import load_dotenv
from util import json_response

import util
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = b'\x1dH@\xb94\xc9\xb0\x8e\xd5\xa8\xfe\r\x00\x0c\xb4'
app.permanent_session_lifetime = timedelta(minutes=30)
load_dotenv()


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        user_data = queries.get_user(request.form.get('username-login'))
        if user_data is not None and util.verify_password(request.form.get('pwd-login'), user_data.get('password')):
            session['username'] = request.form.get('username-login')
            return redirect(url_for('index'))
        return redirect(url_for('login', attempt='unsuccessful'))
    return render_template('login.html')


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        hashed_password = util.hash_password(request.form.get("pwd-register"))
        try:
            queries.create_user(request.form.get("username-register"), hashed_password)
            return redirect(url_for("login"))
        except UniqueViolation:
            response = "unsuccessful"
            return redirect(url_for("register", attempt=response))
    return render_template("register.html")


@app.route("/logout")
def logout():
    session.clear()
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>", methods=['GET', 'DELETE'])
@json_response
def delete_board(board_id: int):
    return queries.delete_board(board_id)


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/api/boards/cards/<int:card_id>", methods=['GET', 'DELETE'])
@json_response
def delete_card(card_id: int):
    return queries.delete_card(card_id)


@app.route('/api/cards/create', methods=['POST', 'GET'])
@json_response
def create_card():
    # user_data = queries.get_user_data()
    # session['username'] = user_data['user_name']
    # user_id = queries.get_user_id_by_name(session['username'])
    return queries.create_card_for_board_status(request.json)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
