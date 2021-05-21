const express = require('express');
const router = express.Router();


let Recipe = require('../models/Recipe')


router.route('/').get((req, res) => {
    Recipe.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/').post((req, res, next) => {
    Recipe.create(req.body, (error, data) => {
        if (error) {
            res.json({ success: false, msg: error });
        } else {
            res.json({ success: true, msg: "Reteta adaugata cu succes" });
        }
    })
});

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .populate('meal')
        .exec((error, data) => {
            if (error) {
                res.send(400);
            } else {
                res.json(data);
            }
        })
});

router.route('/:id').put((req, res) => {
    const updateData = req.body;
    const productId = req.params.id;

    Recipe.update({ _id: productId }, updateData, (error, data) => {
        if (error) {
            res.json({ success: false, msg: error });
        } else {
            res.json({ success: true, msg: "Reteta actualizat cu succes" });
        }
    });
});

router.route('/:id').post((req, res) => {
    Recipe.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            Product.remove({ _id: req.params.id }, (error, data) => {
                if (error) {
                    res.json({ success: false, msg: error });
                } else {
                    res.json({ success: true, msg: "Reteta sters cu succes" });
                }
            });
        }
    })
});
module.exports = router;