import React from "react";
import { newsData } from "./utils";


const Events = () => {
  return (
    <>
  
      <section className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">News & Events</h1>
          <p className="lead">
            Stay updated with the latest school activities and achievements.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex flex-wrap justify-content-center gap-4">

          {newsData.map((item) => (
            <div
              key={item.id}
              className="position-relative overflow-hidden rounded shadow"
              style={{
                width: "370px",
                height: "250px",
                cursor: "pointer",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                }}
              />

              <div
                className="position-absolute bottom-0 start-0 w-100 text-white p-3"
                style={{
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.85))",
                }}
              >
                <span className="badge bg-primary mb-2">
                  {item.date}
                </span>

                <h5 className="fw-bold mb-0">
                  {item.title}
                </h5>
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
};

export default Events;