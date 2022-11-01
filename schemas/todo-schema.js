// dependencies
const mongoose = require('mongoose');

// create todo schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// export todo schema
module.exports = todoSchema;
