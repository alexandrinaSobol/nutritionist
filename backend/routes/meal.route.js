const express = require('express');
const router = express.Router();

let Meal = require('../models/Meal');

router.route('/').get((req, res) => {
    Meal.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/:id').get((req, res) => {
    Meal.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/').post((req, res, next) => {
    Meal.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/:id').put((req, res, next) => {
    Meal.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
});

router.route('/:id').delete((req, res, next) => {
    Meal.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = router;