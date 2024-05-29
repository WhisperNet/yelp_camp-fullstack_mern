const express = require('express')
const router = express.Router()
const User = require('../models/user')
const wrapAsync = require('../utils/wrapAsync')
const passport = require('passport')
const userController = require('../controllers/user')

router.route('/register')
    .get(userController.registerForm)
    .post(wrapAsync(userController.register))

router.route('/login')
    .get(userController.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login)

router.get('/logout', userController.logout)

module.exports = router