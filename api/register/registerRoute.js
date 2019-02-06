const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { genToken } = require('../../middleware/auth');
const imageParser = require('../../configs/cloudinary');
const { tippers, tippees } = require('../../models');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary');

router.route('/').post(imageParser.single('image'), async (req, res) => {
    const { tipperBoolean, ...data } = req.body;
    console.log(data);
    const image = {};
    const hash = bcrypt.hashSync(data.password, 8);

    data.password = hash;

    if (!data.first_name || !data.last_name || !data.email || !data.password) {
        res.status(400).json({
            errMessage:
                'first_name, last_name, email, password, and tipperBoolean are required for both tipper and tippee',
        });
        return;
    }

    if (req.file) {
        data.photo_url = req.file.url;
        data.photo_public_id = req.file.public_id;
    }

    if (tipperBoolean) {
        tippers
            .insert(data)
            .then(id => {
                tippers.getById(id[0]).then(data => {
                    const token = genToken(data);
                    data[0].token = token;
                    res.status(201).json(data);
                });
            })
            .catch(res.status(500).json(err));
    } else {
        if ((!data.start_date, !data.tagline)) {
            res.status(400).json({
                errMessage: `first_name, last_name, email, password, start_date, tagline, and tipperBoolean are required`,
            });
            return;
        }

        QRCode.toDataURL(`We need to figure out what to do with this`).then(
            (url, err) => {
                cloudinary.v2.uploader.upload(url, function(err, cloud) {
                    data.qr_url = cloud.url;
                    data.qr_id = cloud.public_id;
                    tippees
                        .insert(data)
                        .then(id => {
                            tippees.getById(id[0]).then(data => {
                                const token = genToken(data);
                                data[0].token = token;
                                res.status(201).json(data);
                            });
                        })
                        .catch(err => {
                            if (err.errno === 19) {
                                res.status(400).json({
                                    errMessage: 'Emails must be unique',
                                    errCode: 1,
                                });
                                return;
                            }
                            res.status(500).json(err);
                        });
                });
            }
        );
    }
});

module.exports = router;
