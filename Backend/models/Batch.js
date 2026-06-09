const mongoose = require("mongoose")

const batchSchema = new mongoose.Schema({
    batchName : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    },
    students : [{
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    }],
    requests : [{
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    }],
    session : [{
        type : mongoose.Schema.ObjectId,
        ref : 'session'
    }],
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('batch', batchSchema);