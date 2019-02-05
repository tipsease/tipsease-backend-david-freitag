const db = require('../db/dbConfig');

exports.getById = id => {
    return db('photourls')
        .where({ id })
        .first();
};
