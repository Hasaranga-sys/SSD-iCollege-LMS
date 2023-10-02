import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserServices from "../Service/UserServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../UserManagement/Login.css";
import NavBar from "../NavBar";

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const LoginForm = (params) => {
  const [regNumber, setregNumber] = useState("");
  const [password, setpassword] = useState("");
  const nav = useNavigate();
  const {
    userDetails,
    setUserDetails,
    isAuthenticated,
    setIsAuthenticated,
    userName,
    setUserName,
  } = useContext(AuthContext);
  // useEffect(() => {
  //   // Check the user's role from the cookie when the component mounts
  //   const userRole = getUserRoleFromCookie();

  //   if (userRole === "student") {
  //     nav("/StudentHome");
  //   } else if (userRole === "admin") {
  //     nav("/AdminHome");
  //   } else if (userRole === "lecture") {
  //     nav("/Lecture");
  //   }
  // }, []);

  // const getUserRoleFromCookie = () => {
  //   const cookies = document.cookie.split("; ");
  //   for (const cookie of cookies) {
  //     const [name, value] = cookie.split("=");
  //     if (name === "userRole") {
  //       return value;
  //     }
  //   }
  //   return null; // Return null if the cookie doesn't exist
  // };

  useEffect(() => {
    // Check the user's role and userID from the cookie when the component mounts
    const { role, userID } = getUserDataFromCookie();
    // console.log("fdsf"+userID)

    if (role === "student") {
      UserServices.getUser(userID).then((Response) => {
        setUserName(Response.data.lastName);
        // console.log(Response.data.lastName);
      });
      console.log(`User is an admin with ID ${userID}`);
      setUserDetails( {role, userID});
      setIsAuthenticated(true);
          nav("/StudentHome");
    } else if (role === "admin") {
      UserServices.getUser(userID).then((Response) => {
        setUserName(Response.data.lastName);
        // console.log(Response.data.lastName);
      });
      console.log(`User is an admin with ID ${userID}`);
      setUserDetails( {role, userID});
      setIsAuthenticated(true);
      nav("/AdminHome");
    } else if (role === "lecture") {
      UserServices.getUser(userID).then((Response) => {
        setUserName(Response.data.lastName);
        // console.log(Response.data.lastName);
      });
      console.log(`User is an admin with ID ${userID}`);
      setUserDetails( {role, userID});
      setIsAuthenticated(true);
      nav("/Lecture");
    }
  }, []);
  const getUserDataFromCookie = () => {
    const cookies = document.cookie.split("; ");
    let userData = { role: null, userID: null };
    
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "userRole") {
        userData.role = value;
      } else if (name === "userID") {
        userData.userID = value;
      }
    }
  
    return userData;
  };

  const submitClicked = (e) => {
    e.preventDefault();
    const loginTemplate = {
      regNumber,
      password,
    };

    UserServices.login(loginTemplate)
      .then((res) => {
        // setstudent(res.data)
        console.log(res.data);
        if (res.data.role == "student") {
          console.log("true:student");
          document.cookie = `userRole=${res.data.role}; expires=${new Date(Date.now() + 30 * 60 * 1000).toUTCString()}`;
          document.cookie = `userID=${res.data.userID}; expires=${new Date(Date.now() + 30 * 60 * 1000).toUTCString()}`;
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          nav("/StudentHome");
        } else if (res.data.role == "admin") {
          console.log("true:admin");
          document.cookie = `userRole=${res.data.role}; expires=${new Date(Date.now() + 30 * 60 * 1000).toUTCString()}`;
          document.cookie = `userID=${res.data.userID}; expires=${new Date(Date.now() + 30 * 60 * 1000).toUTCString()}`;
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          // nav("/AdminHome")
          nav("/AdminHome");
        } else if (res.data.role == "lecture") {
          console.log("true:lecture");
          document.cookie = `userRole=${res.data.role}; expires=${new Date(Date.now() + 30 * 60 * 1000).toUTCString()}`;
          document.cookie = `userID=${res.data.userID}; expires=${new Date(Date.now() + 30 * 60 * 1000).toUTCString()}`;
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          // nav("/AdminHome")
          nav("/Lecture");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "User Name OR Password In correct!",
        });
        console.log("failed");
      });
    // nav("/students")

    console.log(loginTemplate);
  };

  const usernamesetter = (e) => {
    // console.log(e.userID);
    UserServices.getUser(e.userID).then((Response) => {
      setUserName(Response.data.lastName);
      // console.log(Response.data.lastName);
    });
  };
  return (
    <div>
      <div class="boxlog mt-5">
        <h1>Sign In</h1>

        <form onSubmit={submitClicked}>
          <div class="inputlog">
            <input
              type="text"
              name="email"
              placeholder="Registration number"
              onChange={(e) => {
                setregNumber(e.target.value);
              }}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
          </div>

          <input type="submit" value="Sign in" className="sub " />
        </form>

        <p>
          Don't have an accunt? <a href="/user/-1"> Create Account</a>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
