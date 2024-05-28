const { string, types } = require('joi');
const mongoose = require('mongoose');
const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Review', reviewSchema)