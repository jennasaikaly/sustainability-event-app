const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
    eventTitle: {
        type: String,
        required: true,
    },
    
    organizers: [
        {
          type: String,
          required: true,
        },
    ],

    username: { 
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 400, 
    },
    
    keywords: [
        {
            required: true,
        }
    ],

    location: {
        type: String, 
        required : true,
    },

    image: {
        type: String,
    },

    eventTimiing: {
        type: String, 
        required: true,
    },

    eventDate: {
        type: String, 
        required: true,
    },

    eventFees: {
        type: String, 

    }, 

    contactInfo: {
        type: String,
    },

    addititionalInfo: {
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
    comments: [commentSchema], 
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
    }
);

// get total count of comments and replies on retrieval
eventSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;