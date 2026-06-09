import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const host = "http://localhost:5000";

  

  // Signup
  const createUser = async (user) => {
    const url = `${host}/api/auth/createuser`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        }),
      });

      const data = await res.json();

      return {
        status: res.status,
        data,
      };
 
  };

  // Login
  const validateUser = async (user) => {
    const url = `${host}/api/auth/login`;


      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      const data = await res.json();

      return {
        status: res.status,
        data,
      };
  
  };

  // Get User
  const getUser = async (token) => {
    const url = `${host}/api/auth/getuser`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const data = await res.json();


      if(res.status == 200){
      localStorage.setItem("user",JSON.stringify(data));
      }
      return {
        status: res.status,
        data,
      };
    } catch (error) {
      return "Please try with correct credentials";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        createUser,
        validateUser,
        getUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;