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

// instance methods
todoSchema.methods = {
    // get all the in-progress todos with async/await
    getInProgressTodos() {
        return mongoose.model('Todo').find({ status: 'in-progress' });
    },

    // get all the in-progress todos with callback
    getInProgressTodosCallback(callback) {
        return mongoose.model('Todo').find({ status: 'in-progress' }, callback);
    },
};

// static methods
todoSchema.statics = {
    // get all titles cotanting the given string(js)
    findByJs() {
        return this.find({ title: /js/i });
    },
};

// query helpers
todoSchema.query = {
    // get all the todos containing the given language
    byLanguage(language) {
        return this.find({ title: new RegExp(language, 'i') });
    },
};

// export todo schema
module.exports = todoSchema;
