const db = require('../db/dbConfig');

exports.insert = data => {
    return db('companiestippees').insert(data);
};

exports.getById = id => {
    return db('companiestippees').where('id', id);
};

exports.getAll = () => {
    return db('companiestippees');
};
