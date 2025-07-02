const express = require('express');
const { createTodo, updateTodo } = require('./types');
const app = express();
const port = 8080;
const Todo = require('./db.js');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());

app.post('/todo', async (req, res) => {
    const parsePayload = createTodo.safeParse(req.body);
    if (!parsePayload.success) {
        res.status(411).send({
            message: "You have sent the wrong inputs"
        });
        return;
    }

    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.desctiption,
        complete: false
    });

    await newTodo.save();
    res.status(200).send({
        success: true,
        message: "Your Todo has been created"
    });
});

app.get('/todos', async (req, res) => {
    const AllTodos = await Todo.find({});
    res.status(200).send({
        AllTodos
    });
});

app.put('/completed', async (req, res) => {
    const update = updateTodo.safeParse(req.body);
    if (!update.success) {
        res.status(411).send({
            message: "Send the correct id"
        });
        return;
    }

    await Todo.findByIdAndUpdate(req.body.id, {
        complete: true
    });

    res.status(200).send({
        success: true,
        message: "Marked as completed"
    });
});

app.listen(port, () => {
    console.log(`listening on the port ${port}`);
});
