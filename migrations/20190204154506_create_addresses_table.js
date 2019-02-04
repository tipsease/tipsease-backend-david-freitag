exports.up = function(knex, Promise) {
    return knex.schema.createTable('addresses', tbl => {
        tbl.increments();
        tbl.string('address').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('addresses');
};
