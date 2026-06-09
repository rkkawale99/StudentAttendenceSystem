import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import Modal from "../Attendence/Common/Modal";


const Signup = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([])
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


  const validatePassword = (password) => {
    let newErrors = [];

    if (password.length < 8) {
      newErrors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      newErrors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      newErrors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      newErrors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      newErrors.push("Password must contain at least one special character");
    }

    setErrors(newErrors);
  };




  const [user, setuser] = useState({
    name: "",
    email: "",
    role: "",
    password: ""
  })
  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })

    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  }
  const handleSub = async (e) => {
    e.preventDefault()
    let {data, status} = await createUser(user);
    if (status === 200) {
      localStorage.setItem("token", data)
      openModal("Register Status", "Register Successfully")
      setTimeout(() => {
        setModal({...modal, show : false})
        navigate("/login")
      }, 1000);
      setuser({
      name: "",
      email: "",
      role: "",
      password: ""
    })
    } else {
      let mes = data.error.map(err=>err.msg + "\n")
      openModal("Register Status", mes)
      
    }
    
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
          <h1 className="fw-bold">Create Account</h1>
          <p className="lead">
            Register to access the Attendance Management System
          </p>
        </div>
      </section>
      <section className="container py-5">
        <div
          className="card shadow border-0 mx-auto"
          style={{ maxWidth: "500px" }}
        >
          <div className="card-body p-4">

            <h3 className="text-center mb-4">
              Sign Up
            </h3>

            <form>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={user.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={user.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>

                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>



              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Create a password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                {errors.length > 0 && (
                  <ul className="text-danger mt-2 small">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="form-label"
                >
                  Confirm Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={handleSub}
              >
                Create Account
              </button>

            </form>

            <div className="text-center mt-3">
              <small className="text-muted">Already have an account?{" "}<Link to="/login" className="text-decoration-none" > Login</Link>
              </small>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;