const router = require('express').Router();
const { companies } = require('../../models');

router.route('/').get((req, res) => {
    companies.getAll().then(data => res.status(200).json(data));
});

module.exports = router;
