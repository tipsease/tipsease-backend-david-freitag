exports.up = function(knex, Promise) {
    return knex.schema.createTable('tippees', tbl => {
        tbl.increments();
        tbl.string('first_name').notNullable();
        tbl.string('last_name').notNullable();
        tbl.string('photourls_id');
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
