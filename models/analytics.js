const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
    id:Number,
    interaction_count: Number,
    interaction_time: {
        interaction_time: Array,
        average_time: Number,
    },
    keywords: Object
})

module.exports = mongoose.model('Analytics', analyticsSchema)