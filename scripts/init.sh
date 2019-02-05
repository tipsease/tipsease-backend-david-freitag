rm db/dev.sqlite3
knex migrate:latest &&
knex seed:run