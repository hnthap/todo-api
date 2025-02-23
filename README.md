<style>
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
</style>

<h1>To-Do API</h1>

<div class="tool-banner">
    <img alt="docker" src="https://img.shields.io/badge/-Docker-1D63ED?style=flat-square&logo=docker&logoColor=white" />
    <img alt="mysql" src="https://img.shields.io/badge/-MySQL-003B57?style=flat-square&logo=mysql&logoColor=white" />
    <img alt="express" src="https://img.shields.io/badge/-ExpressJS-gray?style=flat-square&logo=Express&logoColor=white" />
    <img alt="typescript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
</div>

This is my **To-Do API** server following the [Todo List API project on roadmap.sh](https://roadmap.sh/projects/todo-list-api).

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
