const express = require('express');
const router = express.Router();


let Product = require('../models/Product')


router.route('/').get((req, res) => {
    Product.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/').post((req, res, next) => {
    Product.create(req.body, (error, data) => {
        if (error) {
            res.json({ success: false, msg: error });
        } else {
            res.json({ success: true, msg: "Produs adaugat cu success" });
        }
    })
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id, (error, data) => {
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

    Product.update({ _id: productId }, updateData, (error, data) => {
        if (error) {
            res.json({ success: false, msg: error });
        } else {
            res.json({ success: true, msg: "Produs actualizat cu succes" });
        }
    });
});

router.route('/:id').post((req, res) => {
    Product.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            Product.remove({ _id: req.params.id }, (error, data) => {
                if (error) {
                    res.json({ success: false, msg: error });
                } else {
                    res.json({ success: true, msg: "Produs sters cu succes" });
                }
            });
        }
    })
});
module.exports = router;