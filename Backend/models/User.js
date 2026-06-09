const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    Batch : [{
        type : mongoose.Schema.ObjectId,
        ref : 'batch'
    }],
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type :String,
        required : true
    }

})

module.exports = mongoose.model("user", userSchema);