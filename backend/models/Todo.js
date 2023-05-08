require('../database/connect')()
const mongoose = require('mongoose');



const todoSchema = mongoose.Schema({
    name: {type: String, required: true},
    completed: {type: Boolean, required: true}
})

module.exports = mongoose.models?.Todo || mongoose.model('Todo', todoSchema)
