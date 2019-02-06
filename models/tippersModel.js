const db = require('../db/dbConfig');

exports.getAll = () => {
    return db('tippers').select(
        'tippers.id',
        'tippers.first_name',
        'tippers.last_name',
        'tippers.email',
        'tippers.photo_url'
    );
};

exports.getById = id => {
    return db('tippers')
        .where('tippers.id', id)
        .select(
            'tippers.id',
            'tippers.first_name',
            'tippers.last_name',
            'tippers.email',
            'tippers.photo_url'
        );
};

exports.insert = data => {
    return db('tippers').insert(data);
};

exports.remove = id => {
    return db('tippers')
        .where('tippers.id', id)
        .del();
};

exports.update = (id, data) => {
    console.log(id);
    console.log(data);
    return db('tippers')
        .where('tippers.id', id)
        .update(data);
};
