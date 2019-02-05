exports.up = function(knex, Promise) {
    return knex.schema.createTable('tippers', tbl => {
        tbl.increments();
        tbl.string('first_name').notNullable();
        tbl.string('last_name').notNullable();
        tbl.string('photo_url').defaultTo(
            'https://res.cloudinary.com/drkfk1jtk/image/upload/q_100/v1549379225/default.png'
        );
        tbl.string('photo_public_id');
        tbl.string('email')
            .unique()
            .notNullable();
        tbl.string('passwd');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tippers');
};
