import React, { useEffect, useState } from "react";
import Modal from "../Common/Modal";
import { useLocation, useNavigate } from "react-router-dom";


const StudentRequests = () => {
  const [Batch, setBatch] = useState(JSON.parse(localStorage.getItem("CurrentBatch")));
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const loc = useLocation();
  const navigate = useNavigate();




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
  useEffect(() => {
  localStorage.setItem(
    "CurrentBatch",
    JSON.stringify(Batch)
  );
}, [Batch]);

  const getRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/batches/${Batch._id}/requests`
      );

      const data = await response.json();

      if (response.ok) {

        setRequests(data.batch);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const acceptStudent = async (studentId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/batches/approveStudent",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            batchid: Batch._id,
            studentid: studentId,
          }),
        }
      );
      let data = await response.json();
      openModal("Requests Status", data.mes)
      if (response.ok) {
        setRequests((prev) =>
          prev.filter((student) => student._id !== studentId)
        )
        setBatch({
          ...Batch,
          requests: Batch.requests.filter(
            req => req !== studentId
          ),
          students : [...Batch.students, studentId]
        });
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rejectStudent = async (studentId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/batches/rejectStudent",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            batchid: Batch._id,
            studentid: studentId,
          }),
        }
      );
      let data = await response.json();
      openModal("Requests Status", data.mes)
      if (response.ok) {
        setRequests((prev) =>
          prev.filter((student) => student._id !== studentId)
        );
        setBatch({
          ...Batch,
          requests: Batch.requests.filter(
            req => req.toString() !== studentId
          )
        });
         
      }
    } catch (error) {
      console.error(error);
    }
  };


  //run only once when page open
  useEffect(() => {
    const load = async () => {
      await getRequests();
    }
    load();
  }, []);

  //run only when path change 
  useEffect(() => {
    localStorage.setItem("CurrentBatch", JSON.stringify(Batch));
  }, [loc.pathname])


  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Student Requests ({requests?.length})
      </h2>
      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        onClose={() => {
          setModal({ ...modal, show: false })
        }
        } />

      {loading && (
        <div className="text-center">
          <h5>Loading...</h5>
        </div>
      )}

      {!loading && requests?.length === 0 && (
        <div className="alert alert-info">
          No pending requests.
        </div>
      )}

      {requests?.map((student) => (
        <div className="card mb-3 shadow-sm" key={student._id}>
          <div className="card-body">
            <h5 className="card-title">{student.name}</h5>

            <p className="card-text mb-1">
              <strong>Email:</strong> {student.email}
            </p>

            {student.phone && (
              <p className="card-text">
                <strong>Phone:</strong> {student.phone}
              </p>
            )}

            <button
              className="btn btn-success me-2"
              onClick={() => {
                acceptStudent(student._id)

              }}
            >
              Accept
            </button>

            <button
              className="btn btn-danger"
              onClick={() => {
                rejectStudent(student._id)
                setBatch({ ...Batch, requests: requests })
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentRequests;