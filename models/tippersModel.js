const db = require('../db/dbConfig');

// exports.getAll = () => {
//     return db('tippers');
// };

exports.getAll = () => {
    return db('tippers')
        .select(
            'tippers.id',
            'tippers.first_name',
            'tippers.last_name',
            'tippers.email',
            'photourls.photo_url as photo_url'
        )
        .from('photourls')
        .join('tippers', 'photourls.id', 'tippers.photourls_id');
};

exports.getById = id => {
    return db('tippers')
        .where('tippers.id', id)
        .select(
            'tippers.id',
            'tippers.first_name',
            'tippers.last_name',
            'tippers.email',
            'photourls.photo_url as photo_url'
        )
        .from('photourls')
        .join('tippers', 'photourls.id', 'tippers.photourls_id');
};

exports.insert = data => {
    return db('tippers')
        .insert(data)
        .then(([id]) => {
            return db('tippers')
                .where({ id })
                .first();
        });
};
