import React, { useContext, useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import BatchContext from "../../../Contexts/BatchContex";
import { useLocation } from "react-router-dom";
import Modal from "../Common/Modal";

const AddStudent = () => {
  const { addStudent, addStudentSession } = useContext(BatchContext);
  const scannerRunning = useRef(false);
  const location = useLocation();

  const type = location.state?.type;
  const sessionid = location.state?.id;

  const [batch, setBatch] = useState(
    JSON.parse(localStorage.getItem("CurrentBatch"))
  );

  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
  });

  const qrRef = useRef(null);
  const isProcessing = useRef(false);

  const openModal = (title, message) => {
    setModal({
      show: true,
      title,
      message,
    });
  };

  useEffect(() => {
    localStorage.setItem("CurrentBatch", JSON.stringify(batch));
  }, [batch]);

  useEffect(() => {
    qrRef.current = new Html5Qrcode("reader");

    const startScanner = async () => {
      try {
        await qrRef.current.start(
          { facingMode: "user" }, // use environment for mobile rear camera
          {
            fps: 10,
            qrbox: {
              width: 280,
              height: 280,
            },
          },
          
          async (decodedText) => {
            // Prevent duplicate scans
            if (isProcessing.current) return;

            isProcessing.current = true;

            try {
              let response;

              if (type === "Batch") {
                response = await addStudent(
                  decodedText,
                  batch._id
                );
              } else {
                response = await addStudentSession(
                  decodedText,
                  sessionid
                );
              }

              const { data, status } = response;

              if (status === 200) {
                if (type === "Batch") {
                  setBatch((prev) => ({
                    ...prev,
                    requests: [
                      ...prev.requests,
                      decodedText,
                    ],
                  }));
                }

                openModal(
                  "Add Student Status",
                  "Student Added Successfully"
                );
                
              } else if (status === 400) {
                openModal(
                  "Add Student Status",
                  data?.mes || "Failed"
                );
              } else {
                openModal(
                  "Add Student Status",
                  "Internal Server Error"
                );
              }
              setTimeout(() => {
                  setModal({...modal, show : false})
                   isProcessing.current = false;
                }, 2000);
            } catch (err) {
              console.error(err);

              openModal(
                "Add Student Status",
                "Something went wrong"
              );
            }
          },
          () => {}
        );
        scannerRunning.current = true;
      } catch (err) {
        console.error("Scanner Error:", err);
      }
    };

    startScanner();
return () => {
  if (scannerRunning.current && qrRef.current) {
    qrRef.current
      .stop()
      .then(() => {
        scannerRunning.current = false;
        return qrRef.current.clear();
      })
      .catch(() => {});
  }
};
  }, []);

  return (
    <div className="position-relative vh-100 bg-dark overflow-hidden">
      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        onClose={() => {
          setModal((prev) => ({
            ...prev,
            show: false,
          }));

          // allow next scan
          isProcessing.current = false;
        }}
      />

      <div id="reader" className="w-100 h-100"></div>

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0,0,0,0.35)",
          pointerEvents: "none",
        }}
      />

      <div
        className="position-absolute top-0 start-50 translate-middle-x mt-4 text-center"
        style={{ zIndex: 1000 }}
      >
        <h1 className="text-white fw-bold">
          Scan Attendance QR
        </h1>

        <p className="text-light">
          Place QR inside the frame
        </p>
      </div>

      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{
          width: "320px",
          height: "320px",
          border: "4px solid #20c997",
          borderRadius: "20px",
          boxShadow: "0 0 25px #20c997",
          zIndex: 1000,
        }}
      />

      <div
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
        style={{ zIndex: 1000 }}
      >
        <span className="badge bg-success fs-5 px-4 py-3">
          📷 Camera Ready
        </span>
      </div>
    </div>
  );
};

export default AddStudent;