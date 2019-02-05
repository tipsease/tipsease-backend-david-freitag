exports.up = function(knex, Promise) {
    return knex.schema.createTable('photourls', tbl => {
        tbl.increments();
        tbl.string('photo_url');
        // tbl.string('photo_url').unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('photourls');
};
