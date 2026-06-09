import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from '../Common/Modal';
import BatchContext from '../../../Contexts/BatchContex';
import Batch from '../Common/Batch';


const TeachersM = () => {
  const [batchName, setbatchName] = useState("")
  const { createBatch, batches } = useContext(BatchContext);
  const navigate = useNavigate();
  const handleSub1 = (batch)=>{
        localStorage.setItem("CurrentBatch", JSON.stringify(batch))
        navigate("/batchinfo")
        
     }

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

  const handleChange = (e) => {
    setbatchName(e.target.value)
  }
  const handleSub = async (e) => {
    e.preventDefault()
    let { data, status } = await createBatch(batchName);
    if (status === 200) {
      openModal(
        "Batch Creation Status",
        "Batch created successfully"
      )
      
      setbatchName("")
    } else {
      openModal(
        "Batch Creation Status",
        data.mes
      )
    }
  }
  return (
    <div className="container mt-5">

      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        onClose={() =>
          setModal({ ...modal, show: false })
        }
      />
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Batch Management</h2>

        <div className="mb-3">
          <label htmlFor="batchName" className="form-label">
            Batch Name
          </label>
          <input
            type="text"
            className="form-control"
            id="batchName"
            placeholder="Enter batch name"
            onChange={handleChange}
            value={batchName}
          />
        </div>

        <button className="btn btn-primary mb-4" onClick={handleSub}>
          Create Batch
        </button>

        <h4>Your All Batches</h4>
        <div className="row">
          {batches?.length === 0 ? (
            <p>No active Batches.</p>
          ) : (
            batches?.map((batch) => (

              <Batch key={batch._id} batch={batch} handleSub={handleSub1} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TeachersM
