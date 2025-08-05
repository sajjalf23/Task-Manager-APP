const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskname : {
        type : String,
        required : true,
    },
    taskisdone:{
        type : Boolean,
        required : true,
    }
}) 

const Taskmodel = mongoose.model("todos",TaskSchema);

module.exports = Taskmodel;