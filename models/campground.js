const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    price: Number,
    img: String,
    description: String,
    location: String
})

module.exports = mongoose.model('campground', campgroundSchema) // 'campground' is the name of the collection in the database