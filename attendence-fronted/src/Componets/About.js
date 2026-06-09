import React from "react";

const About = () => {
  return (
    <>
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">About Us</h1>
          <p className="lead">
            Learn more about our Attendance Management System.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5">

            <h2 className="fw-bold text-primary mb-4">
              Our Mission
            </h2>

            <p className="fs-5 text-muted">
              Our Attendance Management System is designed to simplify
              attendance tracking for teachers and educational institutions.
              The platform provides a fast, secure, and user-friendly way to
              record attendance, manage student records, and generate reports.
            </p>

            <p className="fs-5 text-muted">
              We aim to reduce manual paperwork and help teachers focus more
              on teaching while maintaining accurate attendance records.
            </p>

          </div>
        </div>
      </section>

    
      <section className="container pb-5">
        <h2 className="text-center fw-bold mb-4">
          What We Offer
        </h2>

        <div className="d-flex flex-wrap justify-content-center gap-3">

          <div className="card text-center shadow-sm border-0 p-4" style={{ width: "250px" }}>
            <h3>📋</h3>
            <h5>Attendance Tracking</h5>
            <p className="text-muted">
              Quick and accurate attendance management.
            </p>
          </div>

          <div className="card text-center shadow-sm border-0 p-4" style={{ width: "250px" }}>
            <h3>📊</h3>
            <h5>Reports & Analytics</h5>
            <p className="text-muted">
              Generate attendance reports instantly.
            </p>
          </div>

          <div className="card text-center shadow-sm border-0 p-4" style={{ width: "250px" }}>
            <h3>🔒</h3>
            <h5>Secure Records</h5>
            <p className="text-muted">
              Safe and reliable storage of attendance data.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;