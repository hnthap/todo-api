<!-- <style>
h1 {
    text-align: center;
    font-size: xxx-large;
}

.tool-banner {
    --padding-horizontal: 20px;
    padding-top: 10px; 
    padding-bottom: 20px; 
    padding-left: var(--padding-horizontal);
    padding-right: var(--padding-horizontal);
    width: calc(100% - 2 * var(--padding-horizontal)); 
    display: flex; 
    flex-direction: row; 
    flex-wrap: wrap; 
    justify-content: center;

    img {
        padding: 5px;
    }
}

.right-image {
    --padding: 5px;
    width: 30%;
    min-width: 50px;
    max-width: calc(100% - 2 * var(--padding));
    margin-left: auto;
    margin-right: 0px;
    padding: var(--padding);
    display: block;
    float: right;
    border-radius: 5%;
}
</style> -->

<h1>To-Do API</h1>

<div class="tool-banner">
    <img alt="docker" src="https://img.shields.io/badge/-Docker-1D63ED?style=flat-square&logo=docker&logoColor=white" />
    <img alt="mysql" src="https://img.shields.io/badge/-MySQL-003B57?style=flat-square&logo=mysql&logoColor=white" />
    <img alt="express" src="https://img.shields.io/badge/-ExpressJS-gray?style=flat-square&logo=Express&logoColor=white" />
    <img alt="typescript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
</div>

<!-- <img class="right-image" alt="menu" src="./images/clipboard.jpg" /> -->

This is my **To-Do API** server following the [Todo List API project on roadmap.sh](https://roadmap.sh/projects/todo-list-api).

- [Requirements](#requirements)
- [Setup](#setup)
- [API Menu](#api-menu)
  - [Register](#register)
    - [POST /register/](#post-register)
  - [Login](#login)
    - [POST /login/](#post-login)
  - [Todos](#todos)
    - [POST /todos/](#post-todos)
    - [PUT /todos/:id](#put-todosid)
    - [DELETE /todos/:id](#delete-todosid)
    - [GET /todos/](#get-todos)


## Requirements

Docker (Docker CLI and Docker Compose).

## Setup

Add a file `.docker.env` with the content:

```dotenv
TOKEN_SECRET=<replace this with the actual secret key>
```

Then, add a file `db.docker.env` with the content:

```dotenv
MYSQL_HOST=db
MYSQL_USER=<replace this with the actual username>
MYSQL_PASSWORD=<replace this with the actual password>
MYSQL_ROOT_PASSWORD=<replace this with the actual root password>
MYSQL_DATABASE=<replace this with the actual database name>
```

Then run:

```bash
docker-compose up --build --detach
```

## API Menu

### Register

#### POST /register/

Register new user.

* Request body as JSON with properties `name` (username), `email` and `password`.
* Respond:
  * `400 BAD REQUEST` if name or email or password is not provided, or is invalid.
  * `201 CREATED` if success.
  * `500 INTERNAL SERVER ERROR` if other errors occured.

### Login

#### POST /login/

Login as an existing user.

* Request body as JSON with properties `email` and `password`.
* Respond:
  * `400 BAD REQUEST` if email or password is not provided.
  * `401 UNAUTHORIZED` if email or password is incorrect.
  * `200 CREATED` with an authorization token if success.

### Todos

Requires a bearer authentication.

#### POST /todos/

Add new todo.

* Request body as JSON with properties `title` and `description`.
* Respond:
  * `401 UNAUTHORIZED` if failed to authorize.
  * `201 CREATED` with the created todo as body, which has properties `id` 
    (new todo ID), `title` and `description`.
    `500 INTERNAL SERVER ERROR` if other errors occur.

#### PUT /todos/:id

Update todo data by ID.

* Request parameters: `id` (Todo ID)
* Request body as JSON with properties `title` and `description`.
* Respond:
  * `403 FORBIDDEN` if failed to authorize.
  * `404 NOT FOUND` if `id` is invalid, i.e. not a number or not
    existing id.
  * `400 BAD REQUEST` if `title` or `description` is missing.
  * `200 OK` with updated todo if success.

#### DELETE /todos/:id

Delete todo by ID.

* Request parameters: `id` (Todo ID)
* Respond:
  * `401 UNAUTHORIZED` if failed to authorize.
  * `404 NOT FOUND` if `id` if invalid.
  * `204 NO CONTENT` if success.

#### GET /todos/

List todos.

* Request query: `page` (page number), `limit` (number of todos per page).
* Respond:
  * `401 UNAUTHORIZED` if failed to authorize.
  * `200 OK` with list of todos found.
* Example: `GET /todos/?page=1&limit=10`
