const db = require('../db/dbConfig');

exports.getAll = id => {
    return db('tips').where('tips.tippee_id', id);
};

exports.insert = data => {
    return db('tips').insert(data);
};

exports.getById = id => {
    return db('tips')
        .where('id', id)
        .select('tipper_id', 'tippee_id', 'amount', 'date');
};
