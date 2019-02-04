exports.up = function(knex, Promise) {
    return knex.schema.createTable('companystippees', tbl => {
        tbl.increments();
        tbl.integer('company_id')
            .unsigned()
            .references('id')
            .inTable('companies')
            .notNullable();
        tbl.integer('tippees_id')
            .unsigned()
            .references('id')
            .inTable('tippees')
            .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('companystippees');
};
