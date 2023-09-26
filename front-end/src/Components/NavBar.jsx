import React from "react";
import "../Components/Nav.css";
import $ from "jquery";
import jQuery from "jquery";
import { useContext } from "react";
import { AuthContext } from "./UserManagement/AuthContext";
import UserServices from "./Service/UserServices";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const {
    userDetails,
    setUserDetails,
    isAuthenticated,
    setIsAuthenticated,
    userName,
    setUserName,
  } = useContext(AuthContext);
  const [navbar, setNavbar] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // if (isAuthenticated) {
    //   console.log("true un awelawa");
    //   // setNavbar(AuthenticatedNavBar());
    // } else {
    //   console.log("dan false");
    //   // setNavbar(null);
    // }
    // console.log(isAuthenticated);
  });

  const AuthenticatedNavBar = () => {
    return (
      <>
        <nav>
          <div class="nav-mobile">
            <a id="nav-toggle" href="#!">
              <span></span>
            </a>
          </div>
          <ul class="nav-list">
            {userDetails.role == "admin" ? (
              <>
                <li>
                  <a
                    onClick={() => {
                      navigate("/AdminHome");
                    }}
                  >
                    Admin home
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/AdminHome/NoticeTable");
                    }}
                  >
                    Announcements
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/AdminHome/ViewLibararyItems");
                    }}
                  >
                    E-Library
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/users");
                    }}
                  >
                    User Management
                  </a>
                </li>
              </>
            ) : userDetails.role == "student" ? (
              <>
                <li>
                  <a
                    onClick={() => {
                      navigate("/StudentHome");
                    }}
                  >
                    Student Home
                  </a>
                </li>
              </>
            ) : userDetails.role == "lecture" ? (
              <>
                <li>
                  <a
                    onClick={() => {
                      navigate("/Lecture");
                    }}
                  >
                    Lecture Home
                  </a>
                </li>
              </>
            ) : null}

            <li>
              <a href="#!">Hello {userName}</a>
            </li>
            <li>
              <a
                href="/"
                onClick={() => {
                  setUserDetails(null);
                  setIsAuthenticated(false);
                  setUserName(null);
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  };
  const unAuthenticatedNavBar = () => {
    return (
      <>
        <nav>
          <div class="nav-mobile">
            <a id="nav-toggle" href="#!">
              <span></span>
            </a>
          </div>
          <ul class="nav-list">
            <li>
              <a
                href="/"
                onClick={() => {
                  setUserDetails(null);
                  setIsAuthenticated(false);
                  setUserName(null);
                }}
              >
                log in
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  };
  // user role eka ganna one nm (userDetails.role) eken enawa
  return (
    <div>
      <section class="navigation">
        <div class="nav-container">
          <div class="brand">
            <a href="#!">iCollege</a>
          </div>
          {!isAuthenticated ? unAuthenticatedNavBar() : AuthenticatedNavBar()}
          {/* {!isAuthenticated ? AuthenticatedNavBar() : unAuthenticatedNavBar()} */}
          {/* {navbar} */}
        </div>
      </section>
    </div>
  );
};

export default NavBar;

{
  /* <nav class="navbar navbar-expand-lg bg-primary">
<div class="container-fluid">
  <a class="navbar-brand text-white" href="#">iCollege</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active text-white" aria-current="page" href="/">Home</a>
      </li>
     
    </ul>
   
  </div>
</div>
</nav> */
}
