const express = require('express')
const router = express.Router({ mergeParams: true })
const wrapAsync = require('../utils/wrapAsync');
const reviewController = require('../controllers/review')
const { validateReview } = require('../middleware')
const { isLoggedIn, isReviewer } = require('../middleware')


router.post('/', isLoggedIn, validateReview, wrapAsync(reviewController.new))

router.delete('/:reviewId', isLoggedIn, isReviewer, wrapAsync(reviewController.delete))

module.exports = router