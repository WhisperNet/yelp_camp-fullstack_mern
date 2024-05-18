const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const Joi = require('joi')
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const { title } = require('process');
const { campgroundSchema } = require('./validatorSchemas')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const app = express(); // create an instance of express

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));  // set the views directory
app.set('view engine', 'ejs');  // set the view engine to ejs

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

function validateCampground(req, res, next) {
    const { error } = campgroundSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', validateCampground, wrapAsync(async (req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground.id}`)
}))

app.get('/campgrounds/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground })
}))

app.get('/campgrounds/:id/edit', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
}))

app.put('/campgrounds/:id', validateCampground, wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground.id}`)
}))

app.delete('/campgrounds/:id', wrapAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect(`/campgrounds`)
}))

app.all('*', (req, res, next) => {
    throw new ExpressError('Page Not Found', 404)
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "Oh no! Something went wrong."
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
})