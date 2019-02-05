const db = require('../db/dbConfig');

exports.getAll = () => {
    return db('tippees').select(
        'id',
        'first_name',
        'last_name',
        'photo_url',
        'start_date',
        'email',
        'tagline',
        'qr_url'
    );
};

exports.getById = id => {
    return db('tippees')
        .where('id', id)
        .select(
            'id',
            'first_name',
            'last_name',
            'photo_url',
            'start_date',
            'email',
            'tagline',
            'qr_url'
        );
};