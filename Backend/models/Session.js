const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    batch : {
        type: mongoose.Schema.ObjectId,
        ref: 'batch'
    },
    startTime: {
        type: String,
        default:()=> new Date().toLocaleTimeString()
    },
    endTime: {
        type: String,
        default:null
    },
    Date: {
        type: String,
        default: ()=>new Date().toDateString()
    },
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }]

})

module.exports = mongoose.model('session', sessionSchema);