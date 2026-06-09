import React from "react";
import { calendarEvents } from "./utils";


const Calendar = () => {
  return (
    <>
    
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">School Calendar</h1>
          <p className="lead">
            Important academic dates, events, holidays and examinations.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div className="card shadow border-0">
          <div className="card-body p-4">

            {calendarEvents.map((event, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border-bottom py-4"
              >
                <div>
                  <h5 className="fw-bold mb-1">
                    {event.title}
                  </h5>

                  <span className="text-muted">
                    {event.date}
                  </span>
                </div>

                <span
                  className={`badge ${
                    event.type === "Holiday"
                      ? "bg-danger"
                      : event.type === "Exam"
                      ? "bg-warning text-dark"
                      : event.type === "Meeting"
                      ? "bg-info text-dark"
                      : event.type === "Event"
                      ? "bg-success"
                      : "bg-primary"
                  }`}
                >
                  {event.type}
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
};

export default Calendar;