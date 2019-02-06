const db = require('../db/dbConfig');

exports.getAll = id => {
    return db('tips').where('tips.tippee_id', id);
};
