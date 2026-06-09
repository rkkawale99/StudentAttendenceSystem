import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BatchContext from "../../Contexts/BatchContex";
import Modal1 from "../Attendence/Common/Modal1";
import Modal from "../Attendence/Common/Modal";

const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const {deleteAccount} = useContext(BatchContext)

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    localStorage.removeItem("CurrentBatch")
    navigate("/");
  };

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

  const handleDeleteAccount = async () => {
        //Delete Account 
        let {data , status} = await deleteAccount(user._id);
        if(status === 200){
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("CurrentBatch")
          openModal("Account Delete Status" , data.mes);
          navigate('/')
        }else{
          openModal("Account Delete Status" , data.error);
        }


  };

  return (
    <div className="container py-5">
      <Modal1
                show={modal1.show}
                title={modal1.title}
                message={modal1.message}
                onClose={() =>
                    setModal1({ ...modal1, show: false })
                }
                 onDelete={()=>{
                    handleDeleteAccount();
                }} />
                 <Modal
                show={modal.show}
                title={modal.title}
                message={modal.message}
                onClose={() =>
                    setModal({ ...modal, show: false })
                }
                 />
      <div className="card shadow-lg border-0 rounded-4">
        {/* Header */}
        <div className="bg-primary text-white text-center py-5 rounded-top-4">
          <i className="fa-solid fa-circle-user display-1"></i>
          <h2 className="mt-3 fw-bold">{user.name}</h2>
          <span className="badge bg-light text-primary fs-6">
            {user.role.toUpperCase()}
          </span>
        </div>

        {/* Body */}
        <div className="card-body p-5">
          <div className="row g-4">

            <div className="col-md-6">
              <div className="border rounded-3 p-3 bg-light">
                <h6 className="text-muted">User ID</h6>
                <p className="fw-semibold mb-0">{user._id}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-3 p-3 bg-light">
                <h6 className="text-muted">Email</h6>
                <p className="fw-semibold mb-0">{user.email}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-3 p-3 bg-light">
                <h6 className="text-muted">Role</h6>
                <p className="fw-semibold mb-0 text-capitalize">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-3 p-3 bg-light">
                <h6 className="text-muted">Total Batches</h6>
                <p className="fw-semibold mb-0">
                  {user.Batch?.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Batch List */}
          <div className="mt-5">
            <h4 className="fw-bold mb-3">My Batches</h4>

            <div className="d-flex flex-wrap gap-3">
              {user.Batch?.map((batchId, index) => (
                <div
                  key={batchId}
                  className="badge bg-info text-dark p-3 fs-6"
                >
                  Batch {index + 1}
                  <br />
                  <small>{batchId}</small>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-5" />

          {/* Actions */}
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3">

            <button
              className="btn btn-warning px-5 py-2 fw-bold"
              onClick={handleSignOut}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Sign Out
            </button>

            <button
              className="btn btn-danger px-5 py-2 fw-bold"
              onClick={()=>{
                openModal1("Delete Account Status", "Do you want to Delete Account Permentaly???")
              }}
            >
              <i className="fa-solid fa-trash me-2"></i>
              Delete Account
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;