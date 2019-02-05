const router = require('express').Router();
const { tippees } = require('../../models');
const imageParser = require('../../configs/cloudinary');

router
    .route('/')
    .get((req, res) => {
        tippees
            .getAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    })
    .post(imageParser.single('image'), (req, res) => {
        const data = req.body;

        if (req.file) {
            data.photo_url = req.file.url;
            data.photo_public_id = req.file.public_id;
        }
        if (
            !data.first_name ||
            !data.last_name ||
            !data.start_date ||
            !data.tagline
        ) {
            res.status(400).json({
                errMessage:
                    'first_name, last_name, start_date, and tagline are required.',
            });
        }
        tippees
            .insert(data)
            .then(id => {
                tippers.getById(id[0]).then(data => {
                    res.status(201).json(data);
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    tippees
        .getById(id)
        .then(data => {
            if (data === []) {
                res.status(404).json({
                    errMessage: `Tippee ${id} does not exist.`,
                });
            }
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
