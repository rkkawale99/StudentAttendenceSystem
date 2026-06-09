import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../../Contexts/AuthContext";

const NavBar = () => {
  const loc = useLocation();
  const token = localStorage.getItem("token");
  const {getUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

   useEffect( () => {
          const load = async ()=>{
            try {
              const token = localStorage.getItem("token")
          // Fetching All Batches 
          if(token){
             await getUser(token)
          }
            } catch (error) {
              console.error(error)
            }finally{
              setLoading(false)
            }
          }
          load();
        }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
        <h1>loading</h1>
      </div>
    );
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/">
          <img className="mx-3" src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="" width="30" height="24" />
          Attendance
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link
                className={`nav-link ${loc.pathname === "/" || loc.pathname === "/main" ? "active fw-bold" : ""
                  }`}
                to={`${token ? "/main" : "/"}`}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${loc.pathname === "/event" ? "active fw-bold" : ""
                  }`}
                to="/event"
              >
                News & Events
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${loc.pathname === "/calender" ? "active fw-bold" : ""
                  }`}
                to="/calender"
              >
                School Calendar
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${loc.pathname === "/about" ? "active fw-bold" : ""
                  }`}
                to="/about"
              >
                About Us
              </Link>
            </li>

          </ul>

          <div className={`d-flex gap-2 ${token ? "d-none" : ""}`}>
            <Link
              className='btn btn-outline-light'
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn btn-outline-light"
              to="/signup"
            >
             Sign up
            </Link>
          </div>
          <div className={`d-flex gap-2 ${token ? "" : "d-none"}`}>
            <Link to="/userinfo"><i className={`fa-solid fa-circle-user fs-1 ${loc.pathname === "/userinfo" ? "text-info" : "text-white"}`} ></i> </Link>
            </div>

        </div>
      </div>
    </nav>
    </>
  );
};

export default NavBar;