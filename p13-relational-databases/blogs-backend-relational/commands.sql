CREATE TABLE blogs(
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('Dan Abramov', 'test', 'On let vs const');
INSERT INTO blogs (author, url, title) values ('Laurenz Albe', 'test2', 'Gaps in sequences in PostgreSQL');
