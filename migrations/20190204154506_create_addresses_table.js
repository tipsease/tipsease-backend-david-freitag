exports.up = function(knex, Promise) {
    return knex.schema.createTable('addresses', tbl => {
        tbl.increments();
        tbl.string()
            .notNullable()
            .unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('addresses');
};
