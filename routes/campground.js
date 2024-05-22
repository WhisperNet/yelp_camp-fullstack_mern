const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../validatorSchemas')

function validateCampground(req, res, next) {
    const { error } = campgroundSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}


router.get('/', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

router.post('/', validateCampground, wrapAsync(async (req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    req.flash('success', 'Successfully created new campground')
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.get('/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    if (!campground) {
        req.flash('error', "Cann't find the campground")
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}))

router.get('/:id/edit', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', "Cann't find the campground")
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground })
}))

router.put('/:id', validateCampground, wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully edited campground')
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground')
    res.redirect(`/campgrounds`)
}))


module.exports = router