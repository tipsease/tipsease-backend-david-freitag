exports.up = function(knex, Promise) {
    return knex.schema.createTable('companiesaddresses', tbl => {
        tbl.increments();
        tbl.integer('company_id')
            .unsigned()
            .references('id')
            .inTable('companies')
            .notNullable();
        tbl.integer('address_id')
            .unsigned()
            .references('id')
            .inTable('addresses')
            .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('companiesaddresses');
};
