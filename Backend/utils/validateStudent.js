//********** Common helper functions **************/
const User = require("../models/User");
const Batch = require("../models/Batch");

// check whether the user id correct or not 
const validateUserID = async (userid, res)=>{
    const user = await User.findById(userid);
    if(user){
        return user;
    }else{
        return res.status(400).json({ error: "Please enter Valid userid"});
    }
}

// check whether the user id correct or not 
const validateBatchID = async (batchid, res)=>{
    const batch = await Batch.findById(batchid);
    if(batch){
        return batch;
    }else{
        return res.status(400).json({ error: "Please enter Valid Batch ID"});
    }
}

//exception handler for various functions
const asynHanlder = (fn)=>{
    return async (req, res)=>{
        try {
            await fn(req, res)
        }catch(error){
            return res.status(500).json({
                error: "Internal Server Error",
                mes : error.message
            });
        }
    }
}



module.exports = {validateUserID, validateBatchID, asynHanlder}