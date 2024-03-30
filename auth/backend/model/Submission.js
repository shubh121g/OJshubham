const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    language:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true

    },
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
    },
    comment:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("submission",submissionSchema);