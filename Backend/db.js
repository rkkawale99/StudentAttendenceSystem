const mongoose = require("mongoose")

const mongoURL = "mongodb://localhost:27017/attendence"

const conToMongoose = async()=>{
    await mongoose.connect(mongoURL);
    console.log("Connection Successfull");
}

module.exports = conToMongoose;