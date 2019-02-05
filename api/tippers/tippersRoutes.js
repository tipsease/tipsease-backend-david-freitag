const express = require('express');
const { tippers } = require('../../models');
const router = express.Router();
const imageParser = require('../../configs/cloudinary');

router
    .route('/')
    .get((req, res) => {
        tippers
            .getAll()
            .then(async data => {
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
        if (!data.first_name || !data.last_name || !data.email) {
            res.status(400).json({
                errMessage: 'first_name, last_name, and email required.',
            });
            return;
        }
        tippers
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

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        tippers
            .getById(id)
            .then(data => res.status(200).json(data))
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .delete((req, res) => {
        const { id } = req.params;
        tippers
            .remove(id)
            .then(data => {
                if (data === 0) {
                    res.status(404).json({
                        errMessage: `Tipper ${id} does not exist`,
                    });
                    return;
                }
                res.status(200).json({
                    message: `Tipper ${id} was removed from the database.`,
                });
            })
            .catch(err => res.status(500).json(err));
    })
    .put(imageParser.single('image'), (req, res) => {
        const { id } = req.params;

        const data = req.body;
        if (req.file) {
            data.photo_url = req.file.url;
            data.photo_public_id = req.file.public_id;
        }

        tippers
            .update(id, data)
            .then(data => {
                if (data === 0) {
                    res.status(404).json({
                        errMessage: `Tipper ${id} does not exist.`,
                    });
                    return;
                }
                tippers.getById(id).then(data => res.status(200).json(data));
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });

module.exports = router;
