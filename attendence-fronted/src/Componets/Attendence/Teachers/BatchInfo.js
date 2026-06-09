import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BatchContext from "../../../Contexts/BatchContex";
import Session from "./Session" 
import Modal1 from "../Common/Modal1";
import Modal from "../Common/Modal";


const BatchInfo = () => {
    const navigate = useNavigate()
    const { createSession, endSession, getAllSessions, deleteBatch} = useContext(BatchContext)
    const [Batch, setBatch] = useState(JSON.parse(localStorage.getItem("CurrentBatch")));
    const user = JSON.parse(localStorage.getItem("user"))
    const [session, setSession] = useState([]);
    const loc = useLocation();

    //Run only once when page open
    useEffect(() => {
        const load = async ()=>{
            let {data, status} = await getAllSessions(Batch?._id);            
            if(status === 200) setSession(data.batch)
        }
        load();
    }, [Batch])

   

    //Run only when path changes
    useEffect(() => {   
        localStorage.setItem("CurrentBatch", JSON.stringify(Batch));
    }, [Batch])
    


    const [modal, setModal] = useState({
        show: false,
        title: "",
        message: "",
    });
     const openModal = (title, message) => {
        setModal({
            show: true,
            title,
            message,
        });
    };
    const [modal1, setModal1] = useState({
        show: false,
        title: "",
        message: "",
    });
    
    const openModal1 = (title, message) => {
        setModal1({
            show: true,
            title,
            message,
        });
    };

   

    if (!Batch) {
        return <h3>No Batch Data Found</h3>;
    }
    const createSession1 = async (batchid) => {
        const { data, status } = await createSession(batchid)
        
        if (status === 200) {
            setSession([...session, data.data])
            setBatch({...Batch, session : [ ...Batch.session, data.data._id]})
            openModal("Session Created Successfully", data.mes)
        } else {
            openModal("Internal Server Error", data.error)
        }


    }
    const handleEnd = async (sessionid) => {
        let { data, status } = await endSession(sessionid);
        if (status === 200) {
            setSession(session.filter(s => s._id !== sessionid))
            openModal("Session Ended Successfully", data.mes)
        } else {
            openModal("Internal Server Error", data.error)
        }

    }

    const handleDelete = async ()=>{
        let {mes , status } = await deleteBatch(Batch._id, user._id);
        if(status === 200) {
            navigate("/main")
        }
    }
    
    

    return (
        <div className="container mt-4">
            <Modal1
                show={modal1.show}
                title={modal1.title}
                message={modal1.message}
                onClose={() =>
                    setModal1({ ...modal1, show: false })
                }
                 onDelete={()=>{
                    handleDelete();
                }} />
                 <Modal
                show={modal.show}
                title={modal.title}
                message={modal.message}
                onClose={() =>
                    setModal({ ...modal, show: false })
                }
                 />
               
            <div className="card shadow">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2>{Batch.batchName}</h2>

                    <div>
                        <button
                            className="btn btn-primary mx-2"
                            onClick={()=>createSession1(Batch._id.toString())}
                        >
                            Create Session
                        </button>
                        {/* change The getlocation */}
                        <button
                            className="btn btn-success mx-2"
                            onClick={() => navigate("/addstudent", {state : {type : "Batch", id : Batch._id}})}
                        >
                            Add Student
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={()=>openModal1("Batch Deleted Status", `Batch ${Batch.name} Deleted successfully`)}
                        >
                            Delete Batch
                        </button>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4" style={{cursor : "pointer"}} onClick={()=>{navigate('/allstudents')}}>
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5>Students</h5>
                                    <h2>{Batch.students.length}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4" style={{cursor : "pointer"}} onClick={()=>{navigate('/allsessions')}}>
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5>Sessions</h5>
                                    <h2>{Batch.session.length}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4" style={{cursor : "pointer"}} onClick={() => navigate("/requests")}>
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5>Pending Requests</h5>
                                    <h2>{Batch.requests.length}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <p>
                        <strong>Batch ID:</strong> {Batch._id}
                    </p>

                    <p>
                        <strong>Created:</strong>{" "}
                        {new Date(Batch.date).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Running Sessions</h4>
                </div>

                <div className="card-body row">
                    

                    {session?.filter(s=> s.endTime === null).length === 0 ? (
                        <p>No active sessions.</p>
                    ) : (
                        session?.filter(s=>s.endTime === null).map((session) => (

                             <Session key={session._id} session={session} handleEnd={handleEnd}/>
                        ))
                    )}

                </div>
            </div>
        </div>
    );
};

export default BatchInfo;