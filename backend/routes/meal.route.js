const express = require('express');
const router = express.Router();

let Meal = require('../models/Meal');
const Recipe = require('../models/Recipe');
let User = require('../models/User');

router.route('/').get((req, res) => {
    Meal.find((error, data) => {
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
            res.json({ success: false, msg: error });
        } else {
            let recipe = {
                name: data.name,
                meal: data._id,
                imageUrl: [data.imageUrl]
            };
            Recipe.create(recipe, (error, data) => {
                if (error) {
                    res.json({ success: false, msg: error });
                } else {
                    Meal.update({ _id: recipe.meal }, { recipe: data._id }, (error, data) => {
                        if (error) {
                            res.json({ success: false, msg: error });
                        } else {
                            res.json({ success: true, msg: "Mancare adaugata cu success" });
                        }
                    });
                }
            })
        }
    })
});

router.route('/plan').post((req, res) => {
    let totalCalories = req.body.calories;

    Meal.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            let finalMeals = [];
            let calorieCountDown = totalCalories / 4;

            let breakfastMeals = data.filter(meal => meal.category == 1);
            while (breakfastMeals.length > 0) {
                let randomIndex = Math.floor(Math.random() * breakfastMeals.length);
                if (calorieCountDown - breakfastMeals[randomIndex].calories <= 0) {
                    breakfastMeals.splice(randomIndex, 1);
                    continue;
                }
                let selectedMeal = breakfastMeals.splice(randomIndex, 1)[0];
                calorieCountDown = calorieCountDown - selectedMeal.calories;
                finalMeals.push(selectedMeal);
            }
            let remainingCalories = calorieCountDown;

            calorieCountDown = (totalCalories / 8 * 3) + remainingCalories;
            let lunchMeals = data.filter(meal => meal.category == 2);
            while (lunchMeals.length > 0) {
                let randomIndex = Math.floor(Math.random() * lunchMeals.length);
                if (calorieCountDown - lunchMeals[randomIndex].calories <= 0) {
                    lunchMeals.splice(randomIndex, 1);
                    continue;
                }
                let selectedMeal = lunchMeals.splice(randomIndex, 1)[0];
                calorieCountDown = calorieCountDown - selectedMeal.calories;
                finalMeals.push(selectedMeal);
            }
            remainingCalories = calorieCountDown;

            calorieCountDown = (totalCalories / 8 * 3) + remainingCalories;
            let dinnerMeals = data.filter(meal => meal.category == 3);
            while (dinnerMeals.length > 0) {
                let randomIndex = Math.floor(Math.random() * dinnerMeals.length);
                if (calorieCountDown - dinnerMeals[randomIndex].calories <= 0) {
                    dinnerMeals.splice(randomIndex, 1);
                    continue;
                }
                let selectedMeal = dinnerMeals.splice(randomIndex, 1)[0];
                calorieCountDown = calorieCountDown - selectedMeal.calories;
                finalMeals.push(selectedMeal);
            }

            res.json(finalMeals)
        }
    })
});

router.route('/:id').get((req, res) => {
    Meal.findById(req.params.id, (error, data) => {
        if (error) {
            res.send(400);
        } else {
            res.json(data);
        }
    })
});

router.route('/:id').put((req, res) => {
    const updateData = req.body;
    const mealId = req.params.id;

    Meal.update({ _id: mealId }, updateData, (error, data) => {
        if (error) {
            res.json({ success: false, msg: error });
        } else {
            res.json({ success: true, msg: "Mancare actualizata cu succes" });
        }
    });
});

router.route('/:id').post((req, res) => {
    Meal.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            Meal.remove({ _id: req.params.id }, (error, data) => {
                if (error) {
                    res.json({ success: false, msg: error });
                } else {
                    Recipe.remove({ meal: req.params.id }, (error, data) => {
                        if (error) {
                            res.json({ success: false, msg: error });
                        } else {
                            res.json({ success: true, msg: "Mancare stearsa cu succes" });
                        }
                    })
                }
            });
        }
    })
});

router.route('/:id/favorite').put((req, res) => {
    const userId = req.body.userId;
    const mealId = req.params.id;

    User.findOne({ _id: userId })
        .exec((err, usr) => {
            if (err) {
                console.log(err);
                res.json({ success: false, msg: err });
            } else {
                usr.meals.push(mealId);
                User.findOneAndUpdate({ _id: usr._id }, { meals: usr.meals }, (err, editedUser) => {
                    if (err) {
                        res.json({ success: false, msg: err });
                    } else {
                        res.json({ success: true, msg: "Mancare adaugata la favorite cu succes" });
                    }
                })
            }
        });
});

router.route('/:id/unfavorite').put((req, res) => {
    const userId = req.body.userId;
    const mealId = req.params.id;

    User.findOne({ _id: userId })
        .exec((err, usr) => {
            if (err) {
                console.log(err);
                res.json({ success: false, msg: err });
            } else {
                usr.meals.splice(usr.meals.indexOf(mealId), 1);
                User.findOneAndUpdate({ _id: usr._id }, { meals: usr.meals }, (err, editedUser) => {
                    if (err) {
                        res.json({ success: false, msg: err });
                    } else {
                        res.json({ success: true, msg: "Mancare eliminat de la favorite cu succes" });
                    }
                })
            }
        });
});

module.exports = router;