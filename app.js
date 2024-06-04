if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

// console.log(process.env.CLOUDINARY_CLOUD_NAME)

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session')
const flash = require('connect-flash')
const campgroundsRoutes = require('./routes/campground')
const reviewsRoutes = require('./routes/review')
const userRoutes = require('./routes/user')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const MongoDBStore = require('connect-mongo')(session)
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize())
app.use(helmet({ contentSecurityPolicy: false }))

const secret = process.env.SECRET

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 3600
})

store.on('error', function (e) {
    console.log("session store error", e)
})

const sessionConfig = {
    store,
    name: 'db02baefecc63791399b79bd597c63f2afeda47d4ede42dc34b5d0892fb086b9',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
        // secure: true
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/', (req, res) => {
    res.render('home', { currentUser: req.user })
})
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use('/', userRoutes)
app.use('/campgrounds', campgroundsRoutes)
app.use('/campgrounds/:id/reviews', reviewsRoutes)


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