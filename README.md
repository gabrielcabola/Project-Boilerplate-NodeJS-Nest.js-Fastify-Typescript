
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)


### Boilerplate NodeJS + Nest.js + Fastify + Typescript Boilerplate

## Start Guide

### Outside Docker containers

- Create .env file `cp .env.example .env` and replace existing env variables
- Install dependencies `yarn`
- Start the app `yarn start` (app will be exposed through the port 3000)

### Inside Docker containers
Just run already prepared bash script:
```bash
$ ./init
```
It will setup the project for you (starting docker-compose stack, running migrations).
The NestJS app running in dev mode will be exposed on `http://localhost` (port 80)
For IDE autocompletion to work, run `yarn` on the host machine.

## TypeORM integrated

[TypeORM](http://typeorm.io/) gives you possibility to use next db types:
`mysql`, `postgres`, `mariadb`, `sqlite`, etc. Please look at docs for more details.
The `docker-compose` template uses `postgres` on port 5234.

## Migrations
If you don't work on a production-ready project you can always change `DB_SYNC` env variable to true so you can play with NestJS without the need to write actual migrations.
**`synchronize: true` shouldn't be used in production - otherwise, you can lose production data.**

### Create Migration
Creating new migration is relatively easy and you can use typeorm CLI for that. You can run this command to create new migration:
```bash
$ docker exec -it nest yarn migration:create -n {CreateTableName}
```
Migration file will be placed under `src/migrations`.

### Run Migrations
```bash
$ docker exec -it nest yarn migration:run
```
### Revert Migrations
```bash
$ docker exec -it nest yarn migration:revert
```

## Test

```bash
# unit tests
$ docker exec -it nest yarn test

# e2e tests
$ docker exec -it nest yarn test:e2e

# test coverage
$ docker exec -it nest yarn test:cov
```

## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables from `.env` file, which is created automatically by the init script from `.env.example`.

## Swagger

RESTful APIs you can describe with already integrated Swagger.
To see all available endpoints visit http://localhost:3000/api/docs


# Infra
- health check url: `http://localhost:8004/health/` -> status 200, 
```json 
{"data":{"status":"ok","info":{"database":{"status":"up"},"memory heap":{"status":"up"},"memory RSS":{"status":"up"},"disk health":{"status":"up"}},"error":{},"details":{"database":{"status":"up"},"memory heap":{"status":"up"},"memory RSS":{"status":"up"},"disk health":{"status":"up"}}}}
```


# Env variables
| Env                                  | Type | Notes                                 | Exmaple                             | Default                          |
|--------------------------------------|------|---------------------------------------|-------------------------------------|----------------------------------|
| APP_ENV                              | str  |                                       | dev | stage | prod                  | dev                              |
| APP_URL                              | str  | base url                              | http://localhost                    | http://localhost                 |
| APP_PORT                             | str  | applicaiton running port              | 3001                                | 3001                             |
|                                      |
| DB_TYPE                              | str  | Database Engine                       | postgres, mariadb, mysql            | 'postgres'                       |
| DB_SYNC                              | bol  | Auto Create Tables (NEVER USE TRUE ON PROD) | boolean                       | False                            |
| DB_DATABASE                          | str  | Database name                         | app                                 | 'community-report                |
| DB_USERNAME=user                     | str  | Database Username                     | community-report{-stage}            | 'postgres                        |
| DB_PASSWORD                          | str  | Database Password                     |                                     | 'supersecretpassword             |
| DB_HOST                              | str  | Database Host                         | localhost                           | 'localhost                       |
| DB_PORT                              | int  | Database Port                         | 5432                                | 5432                             |


