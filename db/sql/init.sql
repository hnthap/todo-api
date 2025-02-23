DROP DATABASE IF EXISTS todos;

CREATE DATABASE todos;

CREATE TABLE todos.user (
    user_id         INTEGER NOT NULL    AUTO_INCREMENT PRIMARY KEY,
    username        CHAR(30) NOT NULL,
    email           VARCHAR(320) NOT NULL,
    encrypted_password  VARCHAR(128) NOT NULL,
    created_time    DATETIME NOT NULL   DEFAULT CURRENT_TIMESTAMP,
    updated_time    DATETIME NOT NULL   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE todos.user
ADD CONSTRAINT uk__user__username
UNIQUE (username);

ALTER TABLE todos.user
ADD CONSTRAINT uk__user__email
UNIQUE (email);

CREATE TABLE todos.todo (
    todo_id         INTEGER NOT NULL    AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(120) NOT NULL,
    description     TEXT NOT NULL,
    created_time    DATETIME NOT NULL   DEFAULT CURRENT_TIMESTAMP,
    updated_time    DATETIME NOT NULL   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id         INTEGER NOT NULL
);

ALTER TABLE todos.todo
ADD CONSTRAINT fk__todo__user__user_id
FOREIGN KEY (user_id)
REFERENCES todos.user (user_id)
ON DELETE CASCADE;

DROP USER IF EXISTS '${MYSQL_USER}'@'%';
CREATE USER '${MYSQL_USER}'@'%'
IDENTIFIED WITH mysql_native_password
BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON todos.*
TO '${MYSQL_USER}'@'%';

DROP USER IF EXISTS '${MYSQL_USER}'@'localhost';
CREATE USER '${MYSQL_USER}'@'localhost'
IDENTIFIED WITH mysql_native_password BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON todos.*
TO '${MYSQL_USER}'@'localhost';

FLUSH PRIVILEGES;
