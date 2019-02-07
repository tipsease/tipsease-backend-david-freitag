const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { genToken } = require('../../middleware/auth');
const imageParser = require('../../configs/cloudinary');
const { userValidator } = require('../../definitions/definitions');
const {
    tippers,
    tippees,
    companies,
    companiesTippees,
} = require('../../models');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary');

router.route('/').post(imageParser.single('image'), async (req, res) => {
    const user = userValidator(req.body);
    if (!user.isValid) {
        res.status(400).json({ errMessage: user.err });
        return;
    }

    let { tipperBoolean, ...data } = req.body;
    const image = {};
    const hash = bcrypt.hashSync(data.password, 8);

    data.password = hash;

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
        insertTippee = async () => {
            try {
                const { company_name, ...inputData } = data;
                const tippeeId = await tippees.insert(inputData);
                const tippee = await tippees.getById(tippeeId[0]);
                const token = genToken(tippee);
                tippee[0].token = token;
                // res.status(201).json(tippee);
                return { company_name, tippeeId, tippee };
            } catch (err) {
                res.status(500).json(err);
            }
        };

        const { company_name, tippeeId, tippee } = await insertTippee();

        try {
            const company = await companies.getByName(company_name);
            if (company.length === 0) {
                const createdCompanyId = await companies.insert({
                    name: company_name,
                });
                await companiesTippees.insert({
                    company_id: createdCompanyId[0],
                    tippees_id: tippeeId[0],
                });
                res.status(201).json(tippee);
            } else {
                await companiesTippees.insert({
                    company_id: company[0].id,
                    tippees_id: tippeeId[0],
                });
                res.status(201).json(tippee);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

module.exports = router;
