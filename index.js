// dependencies
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo-routes');

// express app initialization
const app = express();
const port = 3000;
app.use(express.json());

// connect to mongodb
mongoose
    .connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

// create application routes
app.use('/todo', todoRoutes);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

// listen to server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
