exports.up = function(knex, Promise) {
    return knex.schema.createTable('companies', tbl => {
        tbl.increments();
        tbl.string('name', 255).notNullable();
        tbl.string('address', 255)
            .notNullable()
            .unique();
    });
};

exports.down = function(knex, Promise) {};
