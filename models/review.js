const { string } = require('joi');
const mongoose = require('mongoose');
const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number
})

module.exports = mongoose.model('Review', reviewSchema)