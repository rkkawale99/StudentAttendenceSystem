import React, { useContext, useEffect, useState } from "react";
import Modal1 from "../Common/Modal1";
import BatchContext from "../../../Contexts/BatchContex";
import { useLocation, useNavigate } from "react-router-dom";


const Student = ({ student }) => {
   const [Batch, setBatch] = useState(JSON.parse(localStorage.getItem("CurrentBatch")));
    const { removeStudent} = useContext(BatchContext)
    const navigate = useNavigate();
    const loc = useLocation();


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
    const handleDelete = async ()=>{
        let {mes , status } = await removeStudent(Batch._id, student._id);
        if(status === 200) {
            setBatch({...Batch, students : Batch.students.filter(id=> id.toString() !== student._id)})
            navigate("/batchinfo")
        }
    }
  return (
    <div className="container mt-4">
       <Modal1
                show={modal.show}
                title={modal.title}
                message={modal.message}
                onClose={() =>
                    setModal({ ...modal, show: false })
                }
                 onDelete={()=>{
                    handleDelete();
                }} />
                
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white py-3">
          <h3 className="mb-0">{student.name}</h3>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <h6 className="text-muted">Student ID</h6>
              <p className="fw-semibold">{student._id}</p>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted">Role</h6>
              <span className="badge bg-success fs-6">
                {student.role}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="text-muted">Email</h6>
            <p className="fw-semibold">{student.email}</p>
          </div>

          <div>
            <h6 className="text-muted">
              Batches ({student.Batch.length})
            </h6>

            <div className="d-flex flex-wrap gap-2">
              {student.Batch.map((batchId) => (
                <span
                  key={batchId}
                  className="badge bg-info text-dark p-2"
                >
                  {batchId}
                </span>
              ))}
            </div>
          </div>
        </div>

              <button className="btn btn-danger" onClick={()=> openModal("Remove Student Status ", `Do you Want Remove ${student.name} from Batch ${Batch.name}`)}>Remove Student</button>
      </div>
    </div>
  );
};

export default Student;