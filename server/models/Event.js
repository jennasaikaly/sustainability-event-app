const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
    organizers: [
        {
          type: String,
        },
    ],
    eventTitle: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
})
    