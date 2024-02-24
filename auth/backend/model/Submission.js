const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    pid:{
        type:String,
        required:true,
       
    },
    uid:{
        type:String,
        required:true,
       
    },
    code:{
        type:String,
        required:true
    },
    verdict:{
        type:Boolean,
        required:true
    },
    datetime:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("submission",submissionSchema);