
import { useLocation, useNavigate } from "react-router-dom";

const Session = ({ session, handleEnd }) => {
  const navigate = useNavigate();
  const loc = useLocation();
 
  
  const {
    _id,
    startTime,
    endTime,
    Date,
    students
  } = session;

  return (
    <div className="col-md-4 mb-4" key={_id}>
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">Session</h5>

          <p className="card-text">
            <strong>Date:</strong> {Date}
          </p>

          <p className="card-text">
            <strong>Start Time:</strong> {startTime}
          </p>

          <p className="card-text">
            <strong>End Time:</strong> {endTime}
          </p>

          <p className="card-text">
            <strong>Students Present:</strong> {students.length}
          </p>

         <div className={loc.pathname !== "/batchinfo" ? "d-none" : ""}> <button className="btn btn-primary" onClick={() => navigate("/addstudent", {state : {type : "session" , id : _id}})}>
            Add Student
          </button>
           <button className="btn btn-primary mx-2" onClick={()=>{
            handleEnd(_id)
           }}>
            End Session
          </button></div>
        </div>
      </div>
    </div>
  );
};

export default Session;