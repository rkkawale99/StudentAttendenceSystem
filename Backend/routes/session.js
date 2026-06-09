const express = require("express")
const router = express.Router();
const Batch = require("../models/Batch");
const Session = require("../models/Session");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const fetchUser = require("../utils/fetchUser");
const validateStudent = require("../utils/validateStudent");


//create session using teacher id using :POST and api : /api/sessions/createsession
// atuh-token in headers
router.post("/createsession/:batchid", fetchUser, async (req, res) => {
    try {
        //cheack wheather the batch is present with this name or not
        let getTeacher = await User.findOne({ _id: req.user.id })
        let getBatch = await Batch.findById(req.params.batchid)


        if (!getTeacher || getTeacher.role !== 'teacher') {
            return res.status(401).json({ mes: "Unauthorized User" })
        }
        if (!getBatch) {
            return res.status(400).json({ mes: "Batch Not existed" })
        }
        let date = new Date()

        let getSession = await Session.create({
            user: getTeacher._id,
            batch: getBatch._id,
            startTime: date.toLocaleTimeString(),
            Date: date.toLocaleDateString()
        })
        console.log(getSession);
        getBatch.session.push(getSession._id);
        await getBatch.save();
        // await Batch.findOneAndUpdate({ user: req.user.id }, { $set: getBatch }, { new: true })
        res.status(200).json({ mes: "Session created Successfully", data: getSession })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })

    }
})

//Add Student to  session using Student id using :PUT and api : /api/sessions/addstudent
// body (studentid, sessionid)
router.put("/addstudent", async (req, res) => {
    try {
        //cheack wheather the batch is present with this name or not
        let getStudent = await User.findOne({ _id: req.body.studentid })
        let getSession = await Session.findOne({ _id: req.body.sessionid })


        if (!getStudent || getStudent.role !== 'student') {
            return res.status(401).json({ mes: "Unauthorized User" })
        }
        if (!getSession) {
            return res.status(400).json({ mes: "Session Not existed" })
        }
        //check whether the student present in batch or not 
        let getBatch = await Batch.findOne({ _id: getSession.batch })
        let findStudent = getBatch.students.map(ele => ele === req.body.studentid)
        if (!findStudent) {
            return res.status(401).json({ mes: 'Please join the Batch first' });
        }

        //check whether the student already present int session or not
        const check = getSession.students.filter(
            ele => ele.toString() === req.body.studentid
        );

        if (check.length > 0) {
            return res.status(400).json({
                mes: "You already joined the session"
            });
        }

        getSession.students.push(getStudent);
        await getSession.save();
        // let updated = await Session.findOneAndUpdate({ _id: req.body.sessionid }, { $set: getSession }, { new: true })
        res.status(200).json({ mes: "Session created Successfully", data: getSession })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})


//end the session using sessionid using :PUT and api : /api/sessions/endsession
// body (sessionid)
//auth-token
router.put("/endsession", fetchUser, async (req, res) => {
    try {
        //cheack wheather the batch is present with this name or not
        let { sessionid } = req.body;
        let getTeacher = await User.findOne({ _id: req.user.id })

        if (!getTeacher || getTeacher.role !== 'teacher') {
            return res.status(401).json({ mes: "Unauthorized User" })
        }

        let getSession = await Session.findOne({ _id: sessionid })
        let date = new Date()
        if (!getSession) {
            return res.status(400).json({ mes: "Session Not existed" })
        }
        getSession.endTime = date.toLocaleTimeString();
        let updated = await Session.findOneAndUpdate({ _id: sessionid }, { $set: getSession }, { new: true });
        res.status(200).json({ mes: "Session Ended Successfully", data: updated })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })

    }
})


// getSessions from Batch id using : GET and and api  /api/sessions/getAllSessions
//body batchid
router.post("/getAllSessions", async (req, res) => {
    try {
        //check wheather batch present or not 
        let findBatch = await Batch.findOne({ _id: req.body.batchid })
        if (!findBatch) {
            return res.status(400).json({ mes: " This Batch Not present" })
        }
        console.log(findBatch);
        const arr = await Batch.findById(req.body.batchid).populate("session");

        console.log(arr);
        res.status(200).json({ batch: arr.session })
    }

    catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})


module.exports = router;