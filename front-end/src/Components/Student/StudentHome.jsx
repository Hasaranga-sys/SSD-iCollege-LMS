import React from "react";
import { Link } from "react-router-dom";
import hero from "../images/HERObLOB.svg";
import ViewNotice from "./ViewNotice";
import "../Student/Student.css";
import Foot from "../Foot";

const StudentHome = () => {
  return (
    <div>
      <div className="hero-image" style={{ height: 650 }}>
        <div className="hero-text">{/* <h1>iCollege</h1> */}</div>
      </div>

      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div class="container">
        <center>
          <div class="row mt-5" style={{ marginLeft: 320 }}>
            <div class="col-lg-4 col-sm-6">
              <div class="card-box bg-green">
                <div class="inner">
                  <h3> Lectures </h3>
                  <p> Student Strength </p>
                </div>
                <div class="icon">
                  <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                </div>
                <Link
                  class="card-box-footer"
                  to={"/StudentHome/LectureDetails"}
                >
                  View More <i class="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div class="col-lg-4 col-sm-6">
              <div class="card-box bg-orange">
                <div class="inner">
                  <h3> E-Library </h3>
                  <p> Today’s Collection </p>
                </div>
                <div class="icon">
                  <i class="fa fa-book" aria-hidden="true"></i>
                </div>
                <Link
                  class="card-box-footer"
                  to={"/StudentHome/viewLibrarayItem"}
                >
                  View More <i class="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </center>
      </div>

      <div className="row">
        <ViewNotice />
        {/* 
        <div class="card  text-bg-white shadow-lg mb-3 mt-5 text-center p-4" style={{maxWidth:350, marginLeft:50}}>
                </div>  */}
      </div>
      {/* <Link to="/StudenHome/noticeView">
            <button className="btn btn-primary" variant="contained">notice view</button>
      </Link> */}
    </div>
  );
};

export default StudentHome;
