const db = require('../db/dbConfig');

exports.insert = data => {
    return db('companies').insert(data);
};

exports.getAll = () => {
    return db('companies');
};

exports.getById = id => {
    return db('companies').where('id', id);
};

exports.getByName = name => {
    return db('companies').where('name', name);
};
