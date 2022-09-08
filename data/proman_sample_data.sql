--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards;

---
--- create tables
---

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(250) UNIQUE NOT NULL
);

CREATE TABLE statuses (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL,
    board_id INTEGER NOT NULL,
    column_order INTEGER NOT NULL
);

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    title       VARCHAR(200)        NOT NULL,
    user_id INTEGER,
    submission_time timestamp with time zone DEFAULT now()
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    status_id   INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    card_order  INTEGER             NOT NULL,
    user_id INTEGER NOT NULL,
    submission_time timestamp with time zone DEFAULT now()
);


---
--- insert data
---

INSERT INTO statuses(title, board_id, column_order) VALUES ('new', 1, 1);
INSERT INTO statuses(title, board_id, column_order) VALUES ('in progress', 1, 2);
INSERT INTO statuses(title, board_id, column_order) VALUES ('testing',1, 3);
INSERT INTO statuses(title, board_id, column_order) VALUES ('done', 1, 4);
INSERT INTO statuses(title, board_id, column_order) VALUES ('new2', 2, 1);
INSERT INTO statuses(title, board_id, column_order) VALUES ('in progress2', 2, 2);
INSERT INTO statuses(title, board_id, column_order) VALUES ('testing2', 2, 3);
INSERT INTO statuses(title, board_id, column_order) VALUES ('done2', 2, 4);

INSERT INTO boards(title) VALUES ('Board 1');
INSERT INTO boards(title) VALUES ('Board 2');


INSERT INTO users VALUES (nextval('users_id_seq'), 'default user', 'cc3a0280e4fc1415930899896574e118');
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 1', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 2', 2, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 2, 'in progress card', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 3, 'planning', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 2, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 5, 'new card 1', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 5, 'new card 2', 2, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 6, 'in progress card', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 7, 'planning', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 8, 'done card 1', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 8, 'done card 1', 2, 1);

---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_cards_user_id FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_user_id FOREIGN KEY (user_id) REFERENCES users(id);
