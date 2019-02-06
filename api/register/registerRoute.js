const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { genToken } = require('../../middleware/auth');
const imageParser = require('../../configs/cloudinary');
const { tippers, tippees, companies } = require('../../models');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary');

router.route('/').post(imageParser.single('image'), async (req, res) => {
    let { tipperBoolean, ...data } = req.body;
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
        try {
            const [tipperId] = await tippers.insert(data);
            const tipper = await tippers.getById(tipperId);
            const token = genToken(tipper);
            tipper[0].token = token;
            res.status(201).json(tipper);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        if ((!data.start_date, !data.tagline, !data.company_name)) {
            res.status(400).json({
                errMessage: `first_name, last_name, email, password, start_date, tagline, company_name and tipperBoolean are required`,
            });
            return;
        }
        let qrCodeImg = {};
        try {
            qrCodeImg = await QRCode.toDataURL(
                `We need to figure what to do with this`
            );
        } catch (err) {
            console.log(err);
        }

        const genQr = async () => {
            let count = 0;
            let maxRetries = 10;
            while (true) {
                try {
                    const cloud = await cloudinary.v2.uploader.upload(
                        qrCodeImg
                    );
                    const output = {
                        qr_url: cloud.url,
                        qr_id: cloud.public_id,
                    };
                    return output;
                } catch (err) {
                    if (++count === maxRetries) throw err;
                }
            }
        };

        const qrCode = await genQr(qrCodeImg);
        data = { ...data, ...qrCode };

        try {
            const { company_name, ...inputData } = data;
            const tippeeId = await tippees.insert(inputData);
            const tippee = await tippees.getById(tippeeId[0]);
            const token = genToken(tippee);
            tippee[0].token = token;
            res.status(201).json(tippee);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

module.exports = router;
