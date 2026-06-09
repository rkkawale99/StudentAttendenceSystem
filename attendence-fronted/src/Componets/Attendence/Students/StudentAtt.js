import React, { useContext, useEffect, useState } from 'react'
import BatchContext from '../../../Contexts/BatchContex';
import AuthContext from '../../../Contexts/AuthContext';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useLocation } from 'react-router-dom';

const StudentAtt = () => {
  const { user } = useContext(AuthContext);
  const { getStdAtt, getAllSessions } = useContext(BatchContext)
  const [attendence, setattendence] = useState([])
  const [allSessions, setSession] = useState([]);
  const batchcur = useLocation().state.batch;


  useEffect(() => {
    const load = async () => {

      let { data, status } = await getAllSessions(batchcur?._id);

      if (status === 200) {
        const sessions = data.batch;

        setSession(sessions);

        const studentId = user?._id;

        const attendedSessions = sessions.filter(session =>
          session.students.includes(studentId)
        );
        setattendence(attendedSessions);

        const missedSessions = sessions.filter(session =>
          !session.students.includes(studentId)
        );

      }
    };


    if (user?._id && batchcur?._id) {
      load();
    }
  }, [user, batchcur]);
  return (
    <div>
      <div className="card shadow-lg border-0 rounded-4 p-3">
        <div className="card-body d-flex justify-content-center" style={{flexDirection : 'column'}}>
          <h4 className="text-center mb-3">Attendance Calendar</h4>

          <Calendar
            className="attendance-calendar m-auto"
            tileClassName={({ date, view }) => {
              if (view !== "month") return "";

              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              const day_week = date.getDay();
              if(day_week === 0) return "bg-dark text-white rounded-2"
              if(day_week === 6) return " bg-info text-black rounded-2" 
             
              
              

              const sessionExists = allSessions.some(session => {
                const [d, m, y] = session.Date.split("/").map(Number);
                return d === day && m === month && y === year;
              });

              if (!sessionExists) return "bg-info rounded-2";

              const attended = attendence.some(session => {
                const [d, m, y] = session.Date.split("/").map(Number);
                return d === day && m === month && y === year;
              });

              return attended ? "bg-success text-white rounded-2" : "bg-danger text-white rounded-2";
            }}
          />

          <div className="d-flex justify-content-center gap-4 mt-3">
            <span className="badge bg-success p-2">Attended <span className="badge text-black" style={{backgroundColor : 'rgba(95, 236, 95, 0.918)'}}>{attendence.length}</span></span>
            <span className="badge bg-danger p-2">Missed <span className="badge text-white" style={{backgroundColor : 'rgba(227, 118, 118, 0.804)'}}>{allSessions.length - attendence.length}</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAtt
