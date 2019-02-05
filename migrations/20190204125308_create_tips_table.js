exports.up = function(knex, Promise) {
    return knex.schema.createTable('tips', tbl => {
        tbl.increments();
        tbl.integer('tippee_id')
            .unsigned()
            .references('id')
            .inTable('tippees')
            .notNullable('');
        tbl.integer('tipper_id')
            .unsigned()
            .references('id')
            .inTable('tippers')
            .notNullable();
        tbl.float('amount');
        tbl.date('date');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tips');
};
