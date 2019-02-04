exports.up = function(knex, Promise) {
    return knex.schema.createTable('tippers', tbl => {
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.integer('photourls_id')
            .references('id')
            .inTable('photourls')
            .notNullable('');
        tbl.integer('email')
            .unique()
            .notNullable();
        tbl.string('passwd');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tippers');
};
