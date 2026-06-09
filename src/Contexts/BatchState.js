import React, { useState } from 'react'
import axios from 'axios'
import BatchContext from './BatchContex'

const BatchState = (props) => {
    const host = "http://localhost:5000"
    const [batches, setBatches] = useState([]);
    

    // Signup using Register user
    const createBatch = async (batch) => {
        let url = `${host}/api/batches/createbatch`


        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                batchName: batch,
            }),
        });
        
        const data = await res.json();
        setBatches([...batches, data.batch])
        return { data, status: res.status }

    }

    // Signup using Register user
    const getAllBatches = async () => {
        let url = `${host}/api/batches/getAllBatch`


        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });

        const data = await res.json();
        ;

        if (res.status == 200)
            setBatches(data.batch)
        return { data, status: res.status }
    }


    // Signup using Register user
    const addStudent = async (userid, batchid) => {
        

        let url = `${host}/api/batches/addStudent`
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                batchid: batchid,
                studentid: userid
            })
        });

        const data = await res.json();
        console.log(data);

        return { data, status: res.status }
    }


    // Get all Student by batchid
     const getAllStudents = async (batchid) => {
            let url = `${host}/api/batches/getAllStudents`
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    batchid: batchid
                })
            });
    
            const data = await res.json();
            
            return { students : data.batch.students, status: res.status }
        }

        //Delete Batch using batchid and userid

 const deleteBatch = async (batchid, userid) => {
            let url = `${host}/api/batches/deleteBatch`
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid : userid,
                    batchid: batchid
                })
            });
    
            const data = await res.json();
            
            return { mes : data.mes , status: res.status }
        }

                //remove Student using batchid and userid

 const removeStudent = async (batchid, userid) => {
            let url = `${host}/api/batches/removeStudent`
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentid : userid,
                    batchid: batchid
                })
            });
    
            const data = await res.json();
            
            return { mes : data.mes , status: res.status }
        }


        //Delete Accound 
         const deleteAccount = async (userid) => {
            let url = `${host}/api/auth/deleteAccount`
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid : userid
                })
            });
    
            const data = await res.json();
            
            return { data : data , status: res.status }
        }


    // manage Sessions
    //create Session
    const createSession = async (batchid) => {
        let url = `${host}/api/sessions/createsession/${batchid}`


        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });

        const data = await res.json();
        return { data, status: res.status }

    }
    //end Session
    const endSession = async (sessionid) => {

        let url = `${host}/api/sessions/endsession`
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                sessionid: sessionid
            })
        });

        const data = await res.json();
        return { data, status: res.status }

    }

     // add Student to session
    const addStudentSession = async (userid, sessionid) => {
        

        let url = `${host}/api/sessions/addstudent`
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sessionid: sessionid,
                studentid: userid
            })
        });

        const data = await res.json();
        ;
        return { data, status: res.status }
    }
  // get Student attendence in batch
    const getStdAtt = async (studentid, batchid) => {

        let url = `${host}/api/batches/checkAtt`
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                batchid: batchid,
                studentid: studentid
            })
        });

        const data = await res.json();
        ;
        return { data, status: res.status }
    }

    // Get All Sessions using batchid
    const getAllSessions = async (batchid) => {
            let url = `${host}/api/sessions/getAllSessions`
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    batchid: batchid
                })
            });
    
            const data = await res.json();
            return { data, status: res.status }
        }


    return (
        <BatchContext.Provider value={{ deleteAccount,getAllStudents,createBatch, removeStudent,batches,deleteBatch, setBatches, getAllBatches, createSession, endSession, addStudent, addStudentSession, getStdAtt, getAllSessions }}>
            {props.children}
        </BatchContext.Provider>
    )
}

export default BatchState;