const { Schema, model } = require('mongoose')

const schema = new Schema({

    title: {
        type: String,
        required: true
    },
    rateIMDb: {
        type: Number,
        required: true
    },
    durationinMin: {
        type: Number,
        required: true
    }
})

module.exports = model('Film', schema)