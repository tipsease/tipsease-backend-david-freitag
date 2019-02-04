exports.up = function(knex, Promise) {
    return knex.schema.createTable('addresses', tbl => {
        tbl.increments();
        tbl.string('street_address').notNullable();
        tbl.string('city').notNullable();
        tbl.string('zip_code').notNullable();
        tbl.string('country').notNullable();
        tbl.string('building_number');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('addresses');
};
