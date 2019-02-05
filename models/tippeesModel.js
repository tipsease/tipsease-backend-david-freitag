const db = require('../db/dbConfig');

exports.getAll = () => {
    return db('tippees').select(
        'first_name',
        'last_name',
        'photo_url',
        'start_date',
        'email',
        'tagline',
        'qr_url'
    );
};
