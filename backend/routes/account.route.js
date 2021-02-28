const { Router } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../database/db')

router.post('/reg', (req, res) => {
    let newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, (err, User) => {
        if (err)
            res.json({ success: false, msg: "Utilizatorul nu a fost adaugat" });
        else
            res.json({ success: true, msg: "Utilizator audaugat" });
    });
});

router.post('/auth', (req, res) => {
    const login = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(login, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({ success: false, msg: "Acest utilizator nu a fost gasit" });

        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 3600 * 24
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email
                    }
                });
            } else
                return res.json({ success: false, msg: "Aceeasta parola nu coincide" });
        });
    });
});

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('cabinet utilizator');
});

module.exports = router;