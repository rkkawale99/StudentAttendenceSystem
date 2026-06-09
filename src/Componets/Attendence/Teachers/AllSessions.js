import React, { useContext, useEffect, useState } from 'react'
import BatchContext from '../../../Contexts/BatchContex'
import Session from './Session';

const AllSessions = () => {
  const {getAllSessions} = useContext(BatchContext)
  const [Batch, setBatch] = useState(JSON.parse(localStorage.getItem("CurrentBatch")));
  const [sessions, setSessions] = useState([]);

    const handleStudent = ()=>{

    }

  useEffect(() => {
    const load = async ()=>{
        const {data, status} = await getAllSessions(Batch?._id);
        if(status === 200) setSessions(data.batch)
    }
load();
    
  }, [])
  
  return (
    <div>
      <div className="container mt-2">
        <div className="card shadow">
            < div className='card-body row p-4'>
                <h2 className='p-2 mx-4'>All Sessions</h2>
                {
                    sessions.map((session)=>{
                      if(session.endTime !== null)
                        return (<Session key={session._id} session={session} handleStudent={handleStudent}/>)
                    })
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default AllSessions
