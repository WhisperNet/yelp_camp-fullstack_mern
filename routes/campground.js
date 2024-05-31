const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync');
const Campground = require('../models/campground');
const campgroundController = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, doesCampExist, isAuthor } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(wrapAsync(campgroundController.index))
    .post(isLoggedIn, upload.array('img'), validateCampground, wrapAsync(campgroundController.createNew))

router.get('/new', isLoggedIn, campgroundController.newForm)

router.route('/:id')
    .get(doesCampExist, wrapAsync(campgroundController.show))
    .put(isLoggedIn, isAuthor, upload.array('img'), validateCampground, wrapAsync(campgroundController.update))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgroundController.delete))

router.get('/:id/edit', isLoggedIn, doesCampExist, isAuthor, wrapAsync(campgroundController.editForm))




module.exports = router