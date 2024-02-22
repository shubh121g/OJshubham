const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    subcount:{
        type:Number,
        default:0
    },
    difficulty:{
        type:Number,
        default:1,
        enum:[1,2,3]
    },
    tags:[String]
})

module.exports = mongoose.model("problem",problemSchema);