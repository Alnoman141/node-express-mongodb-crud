// dependencies
const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todo-schema');

const routes = express.Router();
const Todo = mongoose.model('Todo', todoSchema);

// get all todos
routes.get('/', async (req, res) => {
    await Todo.find(req.query)
        .select({
            _id: 0,
            date: 0,
            __v: 0,
        })
        .exec((err, todos) => {
            if (err) {
                res.status(500).json({ error: 'Some error occurred while getting the Todos.' });
            } else {
                res.status(200).json({
                    message: 'Todos retrieved successfully',
                    todos,
                });
            }
        });
});

// get a single todo
routes.get('/:id', async (req, res) => {
    await Todo.findById(req.params.id)
        .select({
            _id: 0,
            date: 0,
            __v: 0,
        })
        .exec((err, todo) => {
            if (err) {
                res.status(500).json({ error: 'Some error occurred while getting the Todo.' });
            } else {
                res.status(200).json({
                    message: 'Todo retrieved successfully',
                    todo,
                });
            }
        });
});

// create a todo
routes.post('/', async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save((err) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Todo.',
            });
        } else {
            res.status(200).send({
                message: 'Todo created successfully',
                data: todo,
            });
        }
    });
});

// create multiple todos

routes.post('/bulk', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Todos.',
            });
        } else {
            res.status(200).send({
                message: 'Todos created successfully',
            });
        }
    });
});

// update a todo
routes.put('/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, todo) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while updating the Todo.',
            });
        } else {
            res.status(200).send({
                message: 'Todo updated successfully',
                data: todo,
            });
        }
    });
});

// delete a todo
routes.delete('/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id).exec((err) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting the Todo.',
            });
        } else {
            res.status(200).send({
                message: 'Todo deleted successfully',
            });
        }
    });
});

// export routes
module.exports = routes;
