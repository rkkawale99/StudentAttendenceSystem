import React from "react";
import { features, partners } from "./utils";

const Home = () => {
    return (
        <>
            <section className="hero-section d-flex align-items-center text-center text-white">
                <div className="container">
                    <h1 className="display-2 fw-bold hero-title">
                        Smart Attendance Management System
                    </h1>

                    <p className="lead col-lg-8 mx-auto mt-4 hero-subtitle">
                        Manage student attendance efficiently with real-time tracking,
                        automated reports, secure records, and an easy-to-use interface
                        designed specifically for teachers and educational institutions.
                    </p>


                </div>
            </section>
           


            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">
                        Our Placement Partners
                    </h2>

                    <div className="slider">
                        <div className="slide-track">

                            {
                                partners.map(ele => {
                                    return (<img
                                        src={ele.src}
                                        alt={ele.alt}
                                    />)
                                })
                            }
                            {
                                partners.map(ele => {
                                    return (<img
                                        src={ele.src}
                                        alt={ele.alt}
                                    />)
                                })
                            }

                        </div>
                    </div>
                </div>
            </section>


             <section className="container py-5">
                <h2 className="text-center fw-bold mb-5">
                    Why Choose Our Attendance App?
                </h2>

               
                <div className="row g-4">
  {features.map((feature) => (
    <div className="col-md-4" key={feature.id}>
      <div className="card shadow-sm h-100 border-0">
        <div className="card-body text-center p-4">
          <i
            className={`${feature.icon} fs-1 ${feature.color} mb-3`}
          ></i>

          <h5 className="card-title fw-bold">
            {feature.title}
          </h5>

          <p className="card-text text-muted">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
            </section>

            <footer className="bg-primary text-white py-4">
                <div className="container text-center">
                    <h4 className="fw-bold">Attendance App</h4>

                    <p>
                        Making attendance management smarter, faster and more reliable.
                    </p>

                    <div className="d-flex justify-content-center gap-4 fs-3 mb-3">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-twitter"></i>
                    </div>

                    <hr />

                    <p className="mb-0">
                        © 2026 Attendance App. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Home;