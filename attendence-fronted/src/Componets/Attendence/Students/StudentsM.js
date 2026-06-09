import React, { useState } from "react";
import QRCode from "qrcode";
import Batch from "../Common/Batch";
import { useNavigate } from "react-router-dom";


const StudentsM = ({ userid, batches }) => {
  const [qrImage, setQrImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleSub = (batch)=>{
        localStorage.setItem("CurrentBatch", JSON.stringify(batch))
        navigate("/attPage", {state : {batch}}) 
     }

  const generateQR = async (text) => {
    try {
      const qr = await QRCode.toDataURL(text, {
        width: 1000,
        margin: 2,
      });
      return qr;
    } catch (err) {
      console.error(err);
    }
  };

  const createQR = async () => {
    const qr = await generateQR(userid);
    setQrImage(qr);
    setShowModal(true);
  };

  return (
    <div className="container my-5">
       <div className="card shadow p-4">
       <h4>Your All Batches</h4>
        <div className="row">
          
         {batches?.length === 0 ? (
            <p>No active Batches.</p>
          ) : (
            batches?.map((batch) => (

              <Batch key={batch._id} batch={batch} handleSub={handleSub}/>
            ))
          )}
        </div>
        </div>
      <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4">
  <button
    className="btn btn-primary btn-lg rounded-pill px-4"
    onClick={createQR}
  >
    Generate QR code
  </button>
</div>

      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Scan QR Code
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div
                className="modal-body d-flex justify-content-center align-items-center"
                style={{
                  minHeight: "90vh",
                }}
              >
                {qrImage && (
                  <img
                    src={qrImage}
                    alt="QR Code"
                    style={{
                      width: "90vmin",
                      height: "90vmin",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsM;