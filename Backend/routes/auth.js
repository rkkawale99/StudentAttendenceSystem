const express = require("express")
const router = express.Router();
const User = require("../models/User");
const Batch = require("../models/Batch");
const Session = require("../models/Session");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const fetchUser = require("../utils/fetchUser");
const { asynHanlder, validateUserID } = require("../utils/validateStudent");
const JWT_SECREAT = "Rushiadfakldkf"


//creating user without login using : POST wtih API : /api/auth/createuser
//  minLength: 8|
//  *    minLowercase: 1|
//  *    minUppercase: 1|
//  *    minNumbers: 1|
//  *    minSymbols: 1|
router.post('/createuser', [
    body('name', "Name Should be at least 3 characters").isLength({ min: 3 }),
    body('email', "It Should be Valid Email").isEmail(),
    body("password", "Password Should have at least one character and one number").isStrongPassword()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        //find email with duplicates
        let finduser = await User.findOne({ email: req.body.email });
        if (finduser) {
            return res.status(400).json({ msg: "This Email id already present" })
        }

        let salt = await bcrypt.genSalt(10);
        let secpass = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
            role: req.body.role
        })
        let token = jwt.sign({ user: { id: user._id } }, JWT_SECREAT)
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})


//login user using : POST wtih API : /api/auth/login
router.post("/login", [body('email', "It Should be Valid Email").isEmail(),
body("password", "Password Should have at least one character and one number").isStrongPassword()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        //check in database user exists or not 
        const { email, password } = req.body;
        let getuser = await User.findOne({ email })
        if (!getuser) {
            return res.status(400).json({ error: "Please try with correct credentials" });
        }
        let result = await bcrypt.compare(password, getuser.password);

        if (!result) {
            return res.status(400).json({ error: "Please try with correct credentials" })
        }
        let data = {
            user: {
                id: getuser.id
            }
        }
        let authtoken = jwt.sign(data, JWT_SECREAT);
        res.send({ authtoken })
    } catch (error) {
        res.status(500).json({ error: "Internal Server error", mes: error.message })
    }
})

//Get User Credentials from a /api/auth/getuser AuthToken using : POST login required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        let userid = req.user;

        let getuser = await User.findById(userid.id);

        res.send(getuser);

    } catch (error) {
        res.status(500).json({ error: "Internal Server error", mes: error.message })
    }
})

//Get User Credentials from a /api/auth/deleteAccount 
//body userid
router.delete("/deleteAccount", asynHanlder(async (req, res) => {
    const { userid } = req.body;
    const user = await validateUserID(userid, res);
    
    if(user.role === "student"){
        await User.findByIdAndDelete(userid);
        return res.status(200).json({mes : "Account(student) Deleted Successfully"})
    }

    //delete all Batches if he is teacher
    for (const batch of user.Batch) {
    await Session.deleteMany({ batch: batch._id });
    await Batch.findByIdAndDelete(batch._id);
}
   await user.save()
    // delete Batch from Batch model
    await User.findByIdAndDelete(userid);

    res.status(200).json({ mes: "Account(Teacher) Deleted Successfully" })
}))




module.exports = router