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

const NavBar = ({ user }) => {
  const {
    userDetails,
    setUserDetails,
    isAuthenticated,
    setIsAuthenticated,
    userName,
    setUserName,
    token,
    setToken,
  } = useContext(AuthContext);
  const [navbar, setNavbar] = useState();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [userID, setUserID] = useState(null);

  const config = {
    headers: { Authorization: "Bearer " + token },
  };

  console.log("token", token);

  const logout = () => {
    window.open("https://localhost:443/auth/logout", "_self");
  };
  // const { role, userID } = getUserDataFromCookie();

  // useEffect(async () => {
  //   await getUserDataFromCookie();
  //   UserServices.getUser(userID).then((Response) => {

  //     setUserName(Response.data.lastName);
  //     setIsAuthenticated(true)
  //     // console.log(Response.data.lastName);
  //   });

  // }, []);
  // const getUserDataFromCookie  = async () => {
  //   const cookies = document.cookie.split("; ");
  //   let userData = { role: null, userID: null };

  //   for (const cookie of cookies) {
  //     const [name, value] = cookie.split("=");
  //     if (name === "userRole") {
  //       userData.role = value;
  //       setRole(value)
  //     } else if (name === "userID") {
  //       userData.userID = value;
  //       setUserID(value)
  //     }
  //   }

  //   return userData;
  // };

  useEffect(() => {
    console.log("token", token);
    // if(!token){
    //   navigate("/");
    // }

    const getUserDataFromCookie = async () => {
      const cookies = document.cookie.split("; ");

      let userData = { role: null, userID: null };

      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "userRole") {
          userData.role = value;
          setRole(value);
        } else if (name === "userID") {
          userData.userID = value;
          setUserID(value);
        } else if (name === "token") {
          setToken(value);
        }
      }

      return userData;
    };

    const fetchData = async () => {
      console.log("config");
      const userData = await getUserDataFromCookie();
      if (userData.userID) {
        try {
          console.log("mekaa");
          const response = await UserServices.getUser(userData.userID, config);
          setUserName(response.data.lastName);
          setIsAuthenticated(true);
        } catch (error) {
          // Handle any errors from the API request here.
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [setIsAuthenticated, setUserName]);

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
            {/* {userDetails.role == "admin" ? ( */}
            {role === "admin" || userDetails.role === "admin" ? (
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
            ) : // ) : userDetails.role == "student" ? (
            // ) : role == "student" ? (
            role === "student" || userDetails.role === "student" ? (
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
            ) : // ) : userDetails.role == "lecture" ? (
            // ) : role == "lecture" ? (
            role === "lecture" || userDetails.role === "lecture" ? (
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
                  setToken(null);
                  document.cookie =
                    "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  document.cookie =
                    "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  document.cookie =
                    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
          {user ? (
            <ul className="list">
              <li className="listItem">
                <img src={user.photos[0].value} alt="" className="avatar" />
              </li>
              <li className="listItem">{user.displayName}</li>
              <li>
                <a
                  href="/"
                  onClick={() => {
                    logout();
                    setUserDetails(null);
                    setIsAuthenticated(false);
                    setUserName(null);
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          ) : (
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
          )}
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
