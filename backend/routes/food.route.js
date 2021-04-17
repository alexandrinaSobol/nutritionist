const express = require('express');
const app = express();
const foodRoute = express.Router();


let Food = require('../models/Food');


foodRoute.route('/create').post((req, res, next) => {
  Food.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

foodRoute.route('/').get((req, res) => {
  Food.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

foodRoute.route('/read/:id').get((req, res) => {
  Food.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
foodRoute.route('/update/:id').put((req, res, next) => {
 Food.findByIdAndUpdate(req.params.id, {
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
})

// Delete employee
foodRoute.route('/delete/:id').delete((req, res, next) => {
  Food.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = foodRoute;