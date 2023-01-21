const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: String,
    courseDescription: String,
    price: Number,
    rating: Number,
    totalRatings: Number,
    keyword: String
})

module.exports = mongoose.model('Course', courseSchema)