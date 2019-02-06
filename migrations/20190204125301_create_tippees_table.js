exports.up = function(knex, Promise) {
    return knex.schema.createTable('tippees', tbl => {
        tbl.increments();
        tbl.string('first_name').notNullable();
        tbl.string('last_name').notNullable();
        tbl.string('photo_url')
            .defaultTo(
                'https://res.cloudinary.com/drkfk1jtk/image/upload/q_100/v1549379225/default.png'
            )
            .notNullable();
        tbl.string('photo_public_id');
        tbl.date('start_date').notNullable();
        tbl.string('email')
            .notNullable()
            .unique();
        tbl.string('tagline');
        tbl.string('password').notNullable();
        tbl.string('qr_url').notNullable();
        tbl.string('qr_id').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tippees');
};
