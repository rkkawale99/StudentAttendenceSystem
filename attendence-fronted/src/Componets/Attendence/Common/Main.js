import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../Contexts/AuthContext'
import BatchContext from '../../../Contexts/BatchContex';
import StudentsM from '../Students/StudentsM';
import TeachersM from '../Teachers/TeachersM';


const Main = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const { batches, getAllBatches} = useContext(BatchContext);
    const {getUser} = useContext(AuthContext);

      useEffect( () => {
        const load = async ()=>{
          try {
        // Fetching All Batches 
            await getAllBatches()
             await getUser(token);
          } catch (error) {
            console.error(error)
          }finally{
            setLoading(false)
          }
       
        }
        load();
      }, [batches])
        if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
        <h1>loading</h1>
      </div>
    );
  }else{
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      
      return (
        <>
       {user?.role === "teacher" ? <TeachersM /> : <StudentsM userid={user?._id} batches={batches}/>}
        </>
      )
    }
}
 


export default Main
