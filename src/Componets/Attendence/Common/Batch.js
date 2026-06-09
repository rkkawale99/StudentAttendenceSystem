import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';


const Batch = ({batch, handleSub}) => { 
     const {batchName, session, _id} = batch;
     const user = JSON.parse(localStorage.getItem("user"))
    
     
  return (
   
       
          <div className="col-md-4 mb-4" key={_id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">
                    {batchName}
                  </h5>

                  <span className="badge bg-success">
                    {session.length} 
                  </span>
                </div>

                <p className="card-text text-muted">
                  Manage sessions and students for this batch.
                </p>

                <button className="btn btn-outline-primary w-100" onClick={()=>{
                  handleSub(batch);
                }}>
                  {user?.role === "student" ? "View Attendence" : "View Batch"}
                </button>
              </div>
            </div>
          </div>
  
  )
}

export default Batch
