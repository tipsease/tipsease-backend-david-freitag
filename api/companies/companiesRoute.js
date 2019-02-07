const router = require('express').Router();
const { companies } = require('../../models');

router.route('/').get((req, res) => {
    companies.getAll();
});
