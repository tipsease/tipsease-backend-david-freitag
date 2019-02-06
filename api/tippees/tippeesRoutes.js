const router = require('express').Router();
const { tippees, tips } = require('../../models');
const imageParser = require('../../configs/cloudinary');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary');

router
    .route('/')
    .get(async (req, res) => {
        try {
            const data = await tippees.getAll();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .post(imageParser.single('image'), async (req, res) => {
        const data = req.body;
        if (req.file) {
            data.photo_url = req.file.url;
            data.photo_public_id = req.file.public_id;
        }
        if (
            !data.first_name ||
            !data.last_name ||
            !data.start_date ||
            !data.tagline ||
            !data.email
        ) {
            res.status(400).json({
                errMessage:
                    'first_name, last_name, start_date, and tagline are required.',
            });
        }
        data.passwd = 'randomstuff';
        QRCode.toDataURL(`We need to figure out what to do with this.`).then(
            (url, err) => {
                cloudinary.v2.uploader.upload(url, function(err, cloud) {
                    data.qr_url = cloud.url;
                    data.qr_id = cloud.public_id;
                    tippees
                        .insert(data)
                        .then(id => {
                            console.log(id[0]);
                            tippees.getById(id[0]).then(data => {
                                res.status(201).json(data);
                            });
                        })
                        .catch(err => {
                            if (err.errno === 19) {
                                res.status(400).json({
                                    errMessage: 'Emails must be unique.',
                                    errCode: 1,
                                });
                                return;
                            }
                            res.status(500).json(err);
                        });
                });
            }
        );
    });

router
    .route('/:id')
    .get((req, res) => {
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
    })
    .delete((req, res) => {
        const { id } = req.params;
        tippees
            .remove(id)
            .then(data => {
                if (data === 0) {
                    res.status(404).json({
                        errMessage: `Tippee ${id} does not exist`,
                    });
                    return;
                }
                res.status(200).json({
                    message: `Tippee ${id} was removed from the database`,
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

        tippees
            .update(id, data)
            .then(data => {
                if (data === 0) {
                    res.status(404).json({
                        errMessage: `Tipper ${id} does not exist.`,
                    });
                    return;
                }
                tippees.getById(id).then(data => res.status(200).json(data));
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });

router
    .route('/:id/tips')
    .get((req, res) => {
        const { id } = req.params;

        tips.getAll(id)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(200).json(err));
    })
    .post((req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!data.tipper_id || !data.amount || !data.date) {
            res.status(400).json({
                errMessage: 'tipper_id, amount, and date are required',
            });
        }

        data.tippee_id = id;

        tips.insert(data)
            .then(id => {
                tips.getById(id[0]).then(data => {
                    res.status(201).json(data);
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });

router.route('/:tippee_id/tips/:tip_id').get((req, res) => {
    const { tippee_id, tip_id } = req.params;

    tips.getById(tip_id).then(data => res.status(200).json(data));
});

module.exports = router;
