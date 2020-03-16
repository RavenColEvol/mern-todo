const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    owner_id: {type:String, required:true},
    title : { type : String, required:[true, "Title is required"]},
    description: String,
    checked: { type: Boolean, default: false},
    timestamp: { type : Date, default: Date.now },
})


const TodoModel = mongoose.model('todo', TodoSchema)

module.exports = TodoModel