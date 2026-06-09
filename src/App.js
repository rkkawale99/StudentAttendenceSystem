
import './App.css';
import About from './Componets/About';
import Login from './Componets/authentication/Login';
import Signup from './Componets/authentication/Signup';
import Calender from './Componets/Calender';
import Events from './Componets/Events';
import Home from './Componets/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthState from './Contexts/AuthState';
import Main from './Componets/Attendence/Common/Main';
import BatchState from './Contexts/BatchState';
import StudentRequests from './Componets/Attendence/Teachers/StudentRequests';
import StudentAtt from './Componets/Attendence/Students/StudentAtt';
import AddStudent from './Componets/Attendence/Teachers/AddStudent';
import BatchInfo from './Componets/Attendence/Teachers/BatchInfo';
import NavBar from './Componets/Attendence/Common/NavBar';
import AllSessions from './Componets/Attendence/Teachers/AllSessions';
import AllStudents from './Componets/Attendence/Teachers/AllStudents';
import UserInfo from './Componets/authentication/UserInfo';




function App() {
  return (
    <div >
      <AuthState>
        <BatchState>
          <Router>
            <NavBar />

            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<Login />} path='/login' />
              <Route element={<Signup />} path='/signup' />
              <Route element={<About />} path='/about' />
              <Route element={<Events />} path='/event' />
              <Route element={<Calender />} path='/calender' />
              <Route element={<Main />} path='/main' />
              <Route element={<BatchInfo />} path='/batchinfo' />
              <Route path="/addstudent" element={<AddStudent />} />
              <Route path="/requests" element={<StudentRequests />} />
              <Route path="/attPage" element={<StudentAtt/>} />
              <Route path="/allsessions" element={<AllSessions/>} />
              <Route path="/allstudents" element={<AllStudents/>} />
              <Route path="/userinfo" element={<UserInfo/>} />
            </Routes>


          </Router>
        </BatchState>
      </AuthState>
    </div>
  );
}

export default App;
