const User = require('../models/user')

module.exports.registerForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
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
}

module.exports.loginForm = (req, res) => {
    res.render('users/login')
}

module.exports.login = async (req, res) => {
    req.flash('success', `Welcom back ${req.body.username}`)
    res.redirect('/campgrounds')
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success', 'Goodbye!')
        res.redirect('/campgrounds')
    })
}

