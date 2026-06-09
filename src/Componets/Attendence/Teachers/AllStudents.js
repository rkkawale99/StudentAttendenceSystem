import React, { useContext, useEffect, useState } from 'react'
import Student from './Student';
import BatchContext from '../../../Contexts/BatchContex';

const AllStudents = () => {
     const {getAllStudents} = useContext(BatchContext)
      const Batch = JSON.parse(localStorage.getItem("CurrentBatch"));
      const [students, setStudents] = useState([]);
        //opening useeffect
         useEffect(() => {
            const load = async ()=>{
                const {students, status} = await getAllStudents(Batch?._id);
                
                
                if(status === 200) setStudents(students)
            }
        load();
          }, [])

  return (
    <div>
      <div className="container mt-3">
        <div className="card shadow">
            <div className="card-body row">
                {students?.map((student)=>{
                    if(student.role === "student")
                    return <Student student={student}/>
                })}
            </div>
        </div>
      </div>
    </div>
  )
}

export default AllStudents
