import React, { Link } from "react";

const LectureDash = () => {
  return (
    <div
      className="card w-75 mx-auto mt-5 bg-light p-5"
      style={{ borderRadius: 30 }}
    >
      <div className=" card border ">
        <h2 style={{ borderRadius: 30, textAlign: "center" }}>
          Dashboard-Lecturer
        </h2>

        <div class="py-5 ">
          <div class="container">
            <div class="row mx-auto ">
              <div class="col-md-3 mx-auto">
                <div style={{ height: 190 }} class="card text-center shadow-lg">
                  <div class="card-block">
                    <img
                      style={{ height: 130, width: 130 }}
                      class="card-img-top"
                      src="https://cdn-icons-png.flaticon.com/512/2967/2967357.png"
                      alt="Card image cap"
                    />
                    <h4 class="card-title"></h4>
                    <Link
                      className="btn btn-primary"
                      to={"/AdminHome/NoticeTable"}
                    >
                      Announcements
                    </Link>
                  </div>
                </div>
              </div>

              <div class="col-md-3 mx-auto">
                <div style={{ height: 190 }} class="card text-center shadow-lg">
                  <div class="card-block">
                    <img
                      style={{ height: 130, width: 130 }}
                      class="card-img-top"
                      src="https://cdn-icons-png.flaticon.com/512/2641/2641310.png"
                      alt="Card image cap"
                    />
                    <h4 class="card-title"></h4>
                    <Link
                      className="btn btn-primary"
                      to={"/AdminHome/NoticeTable"}
                    >
                      E-Library
                    </Link>
                  </div>
                </div>
              </div>

              <div class="col-md-3 mx-auto ">
                <div style={{ height: 190 }} class="card text-center shadow-lg">
                  <div class="card-block">
                    <img
                      style={{ height: 130, width: 130 }}
                      class="card-img-top"
                      src="https://cdn-icons-png.flaticon.com/512/476/476863.png"
                      alt="Card image cap"
                    />
                    <h4 class="card-title"></h4>
                    <Link
                      className="btn btn-primary"
                      to={"/AdminHome/NoticeTable"}
                    >
                      User Management
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <br></br>
          </div>
        </div>
      </div>

      <Link to="/AdminHome/NoticeTable">
        <button className="btn btn-primary" variant="contained">
          notice table
        </button>
      </Link>
      <br></br>
      <Link to="/AdminHome/NoticeTable/NoticeForm">
        <button className="btn btn-primary" variant="contained">
          notice form
        </button>
      </Link>

      <br></br>
      <Link to="/AdminHome/addLibararyItemForm">
        <button className="btn btn-primary" variant="contained">
          library form
        </button>
      </Link>

      <br></br>
      <Link to="/AdminHome/ViewLibararyItems">
        <button className="btn btn-primary" variant="contained">
          library View
        </button>
      </Link>
    </div>
  );
};

export default LectureDash;
