require('dotenv').config();
const mongoose = require("mongoose");

const connectionstring = process.env.connectionstring;
mongoose.connect(connectionstring);

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo: todo
};