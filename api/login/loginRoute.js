const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { genToken, authenticate } = require('../../middleware/auth');
const { tippers, tippees } = require('../../models');

router.route('/').post(async (req, res) => {
    const { tipperBoolean, ...creds } = req.body;

    if (tipperBoolean) {
        const { password, ...tipper } = await tippers
            .getAllInternal()
            .where({ email: creds.email })
            .first();
        if (password && bcrypt.compareSync(creds.password, password)) {
            const token = genToken(tipper);
            tipper.role = 'tipper';
            res.status(201).json({
                success: `You have authenticated`,
                token,
                ...tipper,
            });
        } else {
            res.status(401).json({
                errMessage: 'Incorrect username or password',
            });
        }
    } else {
        const { password, ...tippee } = await tippees
            .getAllInternal()
            .where({ email: creds.email })
            .first();
        if (password && bcrypt.compareSync(creds.password, password)) {
            const token = genToken(tippee);
            tippee.role = 'tippee';

            res.status(201).json({
                success: 'You have authenticated',
                token,
                ...tippee,
            });
        } else {
            res.status(401).json({
                errMessage: 'Incorrect username or password',
            });
        }
    }
});

module.exports = router;
