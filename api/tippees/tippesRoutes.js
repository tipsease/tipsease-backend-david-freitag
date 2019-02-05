const router = require('express').Router();
const { tippees } = require('../../models');
const imageParser = require('../../configs/cloudinary');

router.route('/').get((req, res) => {
    tippees
        .getAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
