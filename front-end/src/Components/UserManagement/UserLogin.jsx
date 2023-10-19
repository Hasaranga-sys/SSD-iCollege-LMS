import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserServices from "../Service/UserServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../UserManagement/Login.css";
import NavBar from "../NavBar";
import GoogleButton from "react-google-button";
import {
  GoogleLogin,
  GoogleLogout,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const clientId =
  "228047157354-nv5drkfp0b5f2r9oiiqa4h59gt4ker4b.apps.googleusercontent.com";

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
    token,
    setToken,
    user,
    setUser,
  } = useContext(AuthContext);

  const [Ntoken, setNtoken] = useState("");

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
  const config = {
    headers: { Authorization: "Bearer " + token },
  };

  useEffect(() => {
    // Check the user's role and userID from the cookie when the component mounts
    const { role, userID, token } = getUserDataFromCookie();

    if (role === "student") {
      let cc = {headers: { Authorization: "Bearer " + token }};
      UserServices.getUser(userID, cc).then((Response) => {
        setUserName(Response.data.lastName);
        // console.log(Response.data.lastName);
      });
      console.log(`User is an admin with ID ${userID}`);
      setUserDetails({ role, userID });
      setIsAuthenticated(true);
      nav("/StudentHome");
    } else if (role === "admin") {
      console.log("userID", userID);
      console.log("token111", token);
      let cc = {headers: { Authorization: "Bearer " + token }};
      UserServices.getUser(userID, cc).then((Response) => {
        console.log("userID", userID);
        console.log("token", token);
        setUserName(Response.data.lastName);
         //console.log(Response.data.lastName);
      });
      console.log(`User is an admin with ID ${userID}`);
      setUserDetails({ role, userID });
      setIsAuthenticated(true);
      nav("/AdminHome");
    } else if (role === "lecture") {
      let cc = {headers: { Authorization: "Bearer " + token }};
      UserServices.getUser(userID, cc).then((Response) => {
        setUserName(Response.data.lastName);
        // console.log(Response.data.lastName);
      });
      console.log(`User is an admin with ID ${userID}`);
      setUserDetails({ role, userID });
      setIsAuthenticated(true);
      nav("/Lecture");
    }
  }, []);

  const getUserDataFromCookie = () => {
    const cookies = document.cookie.split("; ");
    console.log("cookies", cookies);
    let userData = { role: null, userID: null, token: null };

    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "userRole") {
        userData.role = value;
      } else if (name === "userID") {
        userData.userID = value;
      } else if (name === "token") {
        userData.token = value;
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
          document.cookie = `userRole=${res.data.role}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          document.cookie = `userID=${res.data.userID}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          document.cookie = `token=${res.data.token}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          setToken(res.data.token);
          nav("/StudentHome");
        } else if (res.data.role == "admin") {
          console.log("true:admin");
          document.cookie = `userRole=${res.data.role}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          document.cookie = `userID=${res.data.userID}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          document.cookie = `token=${res.data.token}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          console.log("to", res.data.token);
          setToken(res.data.token);
          setNtoken(res.data.token);
          console.log("TO", Ntoken);
          // nav("/AdminHome")
          nav("/AdminHome");
        } else if (res.data.role == "lecture") {
          console.log("true:lecture");
          document.cookie = `userRole=${res.data.role}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          document.cookie = `userID=${res.data.userID}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          document.cookie = `token=${res.data.token}; expires=${new Date(
            Date.now() + 30 * 60 * 1000
          ).toUTCString()}`;
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          setToken(res.data.token);
          // nav("/AdminHome")
          nav("/Lecture");
        }
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 429") {
          // console.log("me araka");

          Swal.fire({
            icon: "error",
            title: "Too Many Attempts",
            text: "please try again after 15 seconds",
          });
          console.log("too many tries");
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "User Name OR Password In correct!",
          });
          console.log("failed with incorrct password");
        }

        // console.log(err.message);
      });
    // nav("/students")

    console.log(loginTemplate);
  };

  
  const usernamesetter = (e) => {
    let cc = {headers: { Authorization: "Bearer " + e.token }};
    console.log("headers", cc);
  
    UserServices.getUser(e.userID, cc).then((Response) => {
      setUserName(Response.data.lastName);
      console.log(Response.data.lastName);
    });
  };

  const responseGoogle = (response) => {
    if (response) {
      const userToken = response.credential;
      // Store the user token in local storage
      localStorage.setItem("userToken", userToken);
      const userObject = jwt_decode(userToken);
      console.log("Current user ID token:", response.credential);
      console.log(userObject);

      setUser(userObject);
    }
  };

  const google = () => {
    window.open("https://localhost:443/auth/google", "_self");
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
        <div class="my-3 row d-flex justify-content-center">
          <div class="col-5">
            {/* <GoogleButton onClick={google} /> */}
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign in with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </div>
        </div>

        <p>
          Don't have an accunt? <a href="/user/-1"> Create Account</a>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
