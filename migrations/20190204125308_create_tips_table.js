exports.up = function(knex, Promise) {
    return knex.schema.createSchema('tips', tbl => {
        tbl.unique();
        tbl.integer('tippee_id')
            .unsigned()
            .references('id')
            .inTable('tippee')
            .notNullable('');
        tbl.integer('tipper_id')
            .unsigned()
            .references('id')
            .inTable('tipper')
            .notNullable();
        tbl.float('amount');
        tbl.date('date');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tips');
};