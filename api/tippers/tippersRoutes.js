const { tippers } = require('../../models');
const router = require('express').Router();
const addPhotoToObject = require('../../helpers/photos');

router.route('/').get(async (req, res) => {
    try {
        const allTippers = await tippers.getAll();
        res.status(200).json(allTippers);
    } catch (err) {
        res.status(500).json(err);
    }
});

router
    .route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const tipper = await tippers.getById(id);
            if (tipper === []) {
                res.status(404).json({
                    errMessage: `Tipper ${id} does not exist.`,
                });
                return;
            }
            res.status(200).json(tipper);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const wasTipperDeleted = await tippers.remove(id);
            if (wasTipperDeleted === 0) {
                res.status(404).json({
                    errMessage: `Tipper ${id} does not exist.`,
                });
                return;
            } else {
                res.status(200).json({
                    message: `Tipper ${id} was removed from the database.`,
                });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .put(imageParser.single('image'), (req, res) => {
        const { id } = req.params;

        data = addPhotoToObject(req, req.body);

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
