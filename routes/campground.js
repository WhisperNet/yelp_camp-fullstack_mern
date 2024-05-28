const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, doesCampExist, isAuthor } = require('../middleware')


router.get('/', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

router.post('/', validateCampground, isLoggedIn, wrapAsync(async (req, res) => {
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Successfully created new campground')
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.get('/:id', doesCampExist, wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
        .populate('author')
    res.render('campgrounds/show', { campground })
}))

router.get('/:id/edit', isLoggedIn, doesCampExist, isAuthor, wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
}))

router.put('/:id', validateCampground, isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully edited campground')
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground')
    res.redirect(`/campgrounds`)
}))


module.exports = router