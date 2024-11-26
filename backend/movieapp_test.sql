DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS review;

CREATE TABLE account (
	id SERIAL PRIMARY KEY,
	uname VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE review (
	id SERIAL PRIMARY KEY,
	account_id INTEGER NOT NULL,
	movie_id INTEGER NOT NULL,
	review_title VARCHAR(100),
	review_body TEXT,
	stars INTEGER CHECK (stars BETWEEN 1 AND 5),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

/* Account data */
INSERT INTO account (uname, password) Values ('Maverick', 'Maverick123');
INSERT INTO account (uname, password) Values ('Merlin', 'Merlin123');
INSERT INTO account (uname, password) Values ('Charlie', 'Charlie123');

/* Review data */ 
INSERT INTO review (account_id, movie_id, review_title, review_body, stars) VALUES (1, 744, 'Wow!', 'Great movie!', 5);
INSERT INTO review (account_id, movie_id, review_title, review_body, stars) VALUES (1, 680, '90s greatness', 'Awesome movie!', 5);
INSERT INTO review (account_id, movie_id, review_title, review_body, stars) VALUES (2, 680, 'My opinion of Pulp Fiction...', 'GOAT!!!', 5);
INSERT INTO review (account_id, movie_id, review_title, review_body, stars) VALUES (3, 744, 'Top Gun? More like Flop Gun', 'Tom Cruise sucks', 1);