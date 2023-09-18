const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    data: {},
    keyword: String,
    type: String,
})

module.exports = mongoose.model('Course', courseSchema)