import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import Modal from "../Attendence/Common/Modal";

const Login = () => {
  const { validateUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const [user, setuser] = useState({
    email: "",
    password: ""
  })
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
  });
  const openModal = (title, message) => {
    setModal({
      show: true,
      title,
      message,
    });
  };
  const handleSub = async (e) => {
    e.preventDefault();
    let {data, status} = await validateUser(user);
    console.log(data.authtoken);

    if (status === 200) {
      localStorage.setItem("token", data.authtoken)
      openModal("Login Status", "Login Successfully")
      setTimeout(() => {
        setModal({...modal, show : false})
        navigate("/main")
      }, 1000);
      setuser({
        name: "",
        email: "",
        role: "",
        password: ""
      })
    } else {
        openModal("Login Status", data.error)
    }
  }
  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        onClose={() =>
          setModal({ ...modal, show: false })
        }/>
             
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold">Login</h1>
          <p className="lead">
            Sign in to access the Attendance Management System
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div
          className="card shadow border-0 mx-auto"
          style={{ maxWidth: "450px" }}
        >
          <div className="card-body p-4">

            <h3 className="text-center mb-4">
              Welcome Back
            </h3>

            <form onSubmit={handleSub}>

              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={user.email}
                  name="email"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label"
                >
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={user.password}
                  name="password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Don't have an account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Sign Up
                </Link>
              </small>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Login;