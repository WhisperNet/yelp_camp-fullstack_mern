const express = require('express')
const router = express.Router()
const User = require('../models/user')
const wrapAsync = require('../utils/wrapAsync')
const passport = require('passport')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', wrapAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const newUser = new User({ username, email })
        const user = await User.register(newUser, password)
        req.login(user, (err) => {
            if (err) return next(err)
            req.flash('success', 'Welcome to the Yelp Camp!')
            res.redirect('/campgrounds')
        })

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async (req, res) => {
    req.flash('success', `Welcom back ${req.body.username}`)
    res.redirect('/campgrounds')
})

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success', 'Goodbye!')
        res.redirect('/campgrounds')
    })
})

module.exports = router