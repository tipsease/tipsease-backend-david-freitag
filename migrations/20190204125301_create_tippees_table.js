exports.up = function(knex, Promise) {
    return knex.schema.createTable('tippees', tbl => {
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.string('photo_url');
        tbl.date('start_date').notNullable();
        tbl.string('email')
            .notNullable()
            .unique();
        tbl.string('tagline');
        tbl.string('hash').notNullable();
        tbl.string('qr_url').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tippees');
};
