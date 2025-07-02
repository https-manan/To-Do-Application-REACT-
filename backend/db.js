const mongoose = require('mongoose');
const todoSchema =  new mongoose.Schema({
    title:String,
    description:String,
    complete:Boolean
});


module.exports = mongoose.model('Todo',todoSchema);