const express = require("express")
const router = express.Router();
const Batch = require("../models/Batch");
const User = require("../models/User");
const Session = require("../models/Session")
const { body, validationResult } = require('express-validator');
const fetchUser = require("../utils/fetchUser");
const { validateUserID, validateBatchID, asynHanlder } = require("../utils/validateStudent");
const  mongoose  = require("mongoose");




//********** TEACHERS ONLY APIS **************/


//create batch using POST and api /api/batches/createbatch auth-token in headers
router.post("/createbatch", [
    body("batchName", 'Batch Name should at least 3 characters')
], fetchUser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        //cheack wheather the batch is present with this name or not
        let getuser = await User.findOne({ _id: req.user.id })
        if (!getuser || getuser.role !== 'teacher') {
            return res.status(401).json({ mes: "Unauthorized User" })
        }
        let findBatch = await Batch.findOne({ user: getuser, batchName: req.body.batchName })
        if (findBatch) {
            return res.status(401).json({ mes: " This Batch Already present" })
        }



        let newBatch = await Batch.create({
            batchName: req.body.batchName,
            user: getuser
        })
        getuser.Batch.push(newBatch._id);
        await getuser.save();
        return res.status(200).json({ mes: "Batch Created", batch: newBatch });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})


//Add Student to Batch this is first time so it will not directly add to batch it will send request to
// teacher first and after approving request it will be add using ; PUT and ApI : /api/batches/addStudent
// body(batchid, studentid)
// Batch id
router.put("/addStudent", async (req, res) => {
    try {
        const { batchid, studentid } = req.body;
        //check wheather batch present or not 
        let findBatch = await Batch.findOne({ _id: batchid })
        if (!findBatch) {
            return res.status(400).json({ mes: " This Batch Not present" })
        }
        //check whether student already present in batch or not
        let findStudent = findBatch.students.includes(studentid)
        let studentRequest = findBatch.requests.includes(studentid)


        if (findStudent || studentRequest) {
            return res.status(400).json({ mes: " This Student already present", data: findStudent, data1: studentRequest })
        }
        let getstudent = await User.findOne({ _id: studentid })
        if (!getstudent) {
            return res.status(400).json({ mes: " It is invalid Student id" })
        }
        findBatch.requests.push(studentid);
        await findBatch.save();
        //update Batch And add Student
        // let updated = await Batch.findOneAndUpdate({ _id: req.body.batchid }, { $set: findBatch }, { new: true })

        res.status(200).json({ mes: "Student added to Batch", batch: findBatch })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})

//Approve Request of Student To add Batch using requset :PUT and api  /api/batches/approveStudent
// req.body(studentid, batchid) which is present in request
router.put("/rejectStudent", async (req, res) => {
    try {
        //check wheather batch present or not 
        let { studentid, batchid } = req.body;
        let findBatch = await Batch.findOne({ _id: batchid })
        if (!findBatch) {
            return res.status(400).json({ mes: " This Batch Not present" })
        }
        //check whether student already present in batch or not
        let findStudent = findBatch.students.includes(studentid);
        let studentRequest = findBatch.requests.includes(studentid);
        if (findStudent) {
            return res.status(400).json({ mes: " This Student already present" })
        }
        let getstudent = await User.findOne({ _id: studentid })
        if (!getstudent) {
            return res.status(400).json({ mes: " It is invalid Student id" })
        }
        if (!studentRequest) {
            return res.status(400).json({
                mes: "Student has not requested to join this batch"
            });
        }

        findBatch.requests = findBatch.requests.filter(ele => ele.toString() !== studentid);
        await findBatch.save();
        res.status(200).json({ mes: "You are not allowed for this batch", batch: findBatch })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})

router.put("/approveStudent", async (req, res) => {
    try {
        //check wheather batch present or not 
        let { studentid, batchid } = req.body;
        let findBatch = await Batch.findOne({ _id: batchid })
        if (!findBatch) {
            return res.status(400).json({ mes: " This Batch Not present" })
        }
        //check whether student already present in batch or not
        let findStudent = findBatch.students.includes(studentid);
        let studentRequest = findBatch.requests.includes(studentid);
        if (findStudent) {
            return res.status(400).json({ mes: " This Student already present" })
        }
        if (!studentRequest) {
            return res.status(400).json({
                mes: "Student has not requested to join this batch"
            });
        }
        let getstudent = await User.findOne({ _id: studentid })
        if (!getstudent) {
            return res.status(400).json({ mes: " It is invalid Student id" })
        }

        //    const updated = await Batch.findByIdAndUpdate(
        //         batchid,
        //         {
        //             $pull: { requests: studentid },
        //             $push: { students: studentid }
        //         },
        //         { new: true }
        //     );
        findBatch.requests = findBatch.requests.filter(ele => ele.toString() !== studentid);
        findBatch.students.push(studentid);
        getstudent.Batch.push(batchid);
        await findBatch.save();
        await getstudent.save();
        res.status(200).json({ mes: "Student added to Batch", batch: findBatch })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})


// getAllStudents from Batch id using : POST and and api  /api/batches/getAllStudents
//body batchid
router.post("/getAllStudents", async (req, res) => {
    try {
        //check wheather batch present or not 
        let findBatch = await Batch.findOne({ _id: req.body.batchid })
        if (!findBatch) {
            return res.status(400).json({ mes: " This Batch Not present" })
        }
        const arr = await Batch.findById(req.body.batchid).populate("students");

        res.status(200).json({ batch: arr })
    }

    catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})

// getAllrequests from Batch id using : POST and and api  /api/batches/getAllrequests
//body batchid
router.get("/:batchid/requests", async (req, res) => {
    try {
        //check wheather batch present or not 
        let findBatch = await Batch.findOne({ _id: req.params.batchid })
        if (!findBatch) {
            return res.status(400).json({ mes: " This Batch Not present" })
        }
        const arr = await findBatch.populate("requests");
        res.status(200).json({ batch: arr.requests })
    }

    catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})
router.post("/test", (req, res) => {
    res.send("working");
});


//delete Batch using batchid api /api/batches/deleteBatch
// body(batchid, userid)
router.put("/deleteBatch", asynHanlder(async (req, res) => {
    const { userid, batchid } = req.body;
    const teacher = await validateUserID(userid, res);
    const batch = await validateBatchID(batchid, res)

    if (!teacher.Batch.includes(batchid)) {
        res.status(401).json({ mes: "unauthorized user" })
    }

    //delete All sessions for batchid
    await Session.deleteMany({ batch: batchid })

    //delete bathc from user model(Student)
    //    6a1b2b6e0d4db40914a72142
    batch.students.map(async student => {
        await User.findByIdAndUpdate(student, { $pull: { Batch: batchid } }, { new: true })
    })

    //delete batch from  user model (Teacher)
    teacher.Batch = teacher.Batch.filter(id => id.toString() !== batchid);
    await teacher.save();

    //delete Batch from Batch model
    await Batch.findByIdAndDelete(batchid);

    res.status(200).json({ mes: "Batch Deleted Successfully" })
}))


//remove Student from Batch using api 
// body(userid, Batchid)
router.put("/removeStudent", asynHanlder(async (req, res) => {
    const { studentid, batchid } = req.body;
    const student = await validateUserID(studentid, res);
    const batch = await validateBatchID(batchid, res)

    if (!batch.students.includes(studentid)) {
        return res.status(401).json({ mes: "Student not present in Batch" })
    }

    //remove batch from user model
    student.Batch = student.Batch.filter(batch => batch.toString() !== batchid);


    // Remove student from all sessions of the batch
        batch.session.map(async sessionId =>
         {  let s = await Session.findById(sessionId);
           s.students = s.students.filter(s1=> s1.toString() !== studentid)
           await s.save();
        }
        )
  


    // Remove student from batch
    batch.students = batch.students.filter(
        student => student.toString() !== studentid
    );
    await student.save();
    await batch.save();



    res.status(200).json({ mes: "Student removed From Batch successfully" })
}))


// router.get("/:batchid/requests", async (req, res) => {
//     const batch = await Batch.findById(req.params.batchid)
//         .populate("requests");
//     res.json({
//         requests: batch.requests,
//     });
// });



// *********************API'S FOR  STUDENTS  ONLY*************************

// checkAtt from Batch id and userid that how many sessions did that student attended 
// using : POST and and api  /api/batches/checkAtt
//body batchid, studentid
router.post("/checkAtt", asynHanlder(async (req, res) => {
    const { studentid, batchid } = req.body;
    const student = await validateUserID(studentid, res);
    const batch = await validateBatchID(batchid, res)

    let att = await batch.populate("session");



    att = att.session.filter(ele => ele.students.includes(studentid));

    res.json({ att })
}))



// *********************COMMON API'S FOR TEACHERS AND STUDENTS *************************

// getBatch from Batch id using : POST and and api  /api/batches/getBatch
//token from user 
router.get("/getAllBatch", fetchUser, async (req, res) => {
    try {
        //check wheather batch present or not 
        let findUser = await User.findOne({ _id: req.user.id })
        if (!findUser) {
            return res.status(400).json({ mes: " This User Not present" })
        }
        const arr = await User.findById(req.user.id).populate("Batch");

        res.status(200).json({ batch: arr.Batch })
    }

    catch (error) {
        res.status(500).json({ error: "Internal Server Error", msg: error.message })
    }
})






module.exports = router;