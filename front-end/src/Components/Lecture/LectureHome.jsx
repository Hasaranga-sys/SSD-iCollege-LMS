import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import LectureService from "../Service/LectureService";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import "./grid.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../UserManagement/AuthContext";
import UserServices from "../Service/UserServices";

export default function LectureHome() {
  const [lectureList, setLectureList] = useState([]);
  const [getLectureByid, setGetLectureByid] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [search, setSearch] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [lastName, setlastName] = useState("");
  const [initials, setinitials] = useState("");
  const { userDetails, setUserDetails, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const getLecturesByid = (id) => {
    LectureService.getLectureById(id).then((res) => {
      setGetLectureByid([res.data]);
      console.log(res.data);
      setShow(true);
    });
  };
  //moda hasa
  const deleteLecture = async (id) => {
    Swal.fire({
      text: "Do you want to delete the user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        console.log(id);
        LectureService.deleteLecture(id).then((res) => {
          setLectureList(lectureList.filter((list) => list._id !== id));
        });
      }
    });
  };

  useEffect(() => {
    const getLectures = () => {
      LectureService.getAllLecturers().then((res) => {
        setLectureList(res.data);
        console.log(res.data);
      });
      console.log(userDetails);
      console.log(isAuthenticated);
    };
    UserServices.getUser(userDetails.userID).then((Response) => {
      setlastName(Response.data.lastName);
      setinitials(Response.data.initials);
    });
    getLectures();
  }, []);

  const viewlecture = (postId) => {
    navigate(`/Lecture/${postId}`);
  };

  return (
    <div>
      <div className="lecture-hero-image" style={{ height: 265 }}></div>
      <div>
        <div className="container card my-5">
          <h3 className="p-4">Lecture Schedule</h3>

          <div className="row">
            <div className="d-flex justify-content-end">
              <Button variant="info">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/LectureHome/AddLecture"}
                >
                  Add Lecture
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Lecture Info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {getLectureByid.map((row) => (
                  <div>
                    <div className="row">
                      <div className="col-10">
                        <strong
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginTop: 10,
                          }}
                        >
                          Subject:
                        </strong>
                        {row.subject} <br></br>
                        <strong
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginTop: 10,
                          }}
                        >
                          Topic:
                        </strong>
                        {row.topic} <br></br>
                        <strong
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginTop: 10,
                          }}
                        >
                          Date:
                        </strong>
                        {row.date} <br></br>
                        <strong
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginTop: 10,
                          }}
                        >
                          Time:
                        </strong>
                        {row.time} <br></br>
                        <strong
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginTop: 10,
                          }}
                        >
                          Discription:
                        </strong>
                        <div
                          style={{
                            display: "inline-block",
                            width: "400px",
                            marginTop: 10,
                          }}
                        >
                          {row.discription}
                        </div>
                        <br></br>
                        <strong
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginTop: 10,
                          }}
                        >
                          Lecture slide:
                        </strong>
                        {
                          <a href={row.pdf} download>
                            {row.Subject}
                            {row.topic}
                          </a>
                        }{" "}
                        <br></br>
                        <strong
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginTop: 10,
                          }}
                        >
                          Meeting Link:
                        </strong>
                        <div
                          style={{
                            display: "inline-block",
                            width: "400px",
                            marginTop: 10,
                            marginBottom: 30,
                          }}
                        >
                          <a href={row.meeting_link}>{row.meeting_link}</a>
                        </div>
                        <br></br>
                      </div>
                    </div>
                    <Modal.Footer>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => navigate(`/UpdateLecture/${row._id}`)}
                      >
                        Update
                      </Button>
                    </Modal.Footer>
                  </div>
                ))}
              </Modal.Body>
            </Modal>
          </div>
          <div className="row ">
            <div
              className="col-2 mt-3 "
              style={{ borderRight: "1px solid #E0E0E0" }}
            >
              <span>Select Date</span>
              <input
                placeholder="Select date"
                type="date"
                className="form-control"
                onChange={(e) => setSearch(e.target.value)}
              />
              <br></br>
              <span>Select Year</span>
              <div className="form-check " style={{ paddingLeft: 40 }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1st Year"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label
                  className="form-check-label"
                  for="flexCheckIndeterminate"
                >
                  1st Year
                </label>
              </div>
              <div className="form-check " style={{ paddingLeft: 40 }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="2nd Year"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label
                  className="form-check-label"
                  for="flexCheckIndeterminate"
                >
                  2nd Year
                </label>
              </div>
              <div className="form-check " style={{ paddingLeft: 40 }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="3rd Year"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label
                  className="form-check-label"
                  for="flexCheckIndeterminate"
                >
                  3rd Year
                </label>
              </div>
              <div className="form-check " style={{ paddingLeft: 40 }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="4th Year"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label
                  className="form-check-label"
                  for="flexCheckIndeterminate"
                >
                  4th Year
                </label>
              </div>
              <br></br>
              <span>Select semester</span>
              <div className="form-check " style={{ paddingLeft: 40 }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1st Semester"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label
                  className="form-check-label"
                  for="flexCheckIndeterminate"
                >
                  1st Semester
                </label>
              </div>
              <div className="form-check" style={{ paddingLeft: 40 }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="2nd Semester"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label
                  className="form-check-label"
                  for="flexCheckIndeterminate"
                >
                  2nd Semester
                </label>
              </div>
            </div>

            <div className="container grid col-10">
              {lectureList
                ?.filter((row) => {
                  if (search == "") {
                    return row;
                  } else if (
                    row.year
                      .toString()
                      .toLowerCase()
                      .includes(search.toString().toLowerCase()) ||
                    row.semester
                      .toString()
                      .toLowerCase()
                      .includes(search.toString().toLowerCase()) ||
                    row.date
                      .toString()
                      .toLowerCase()
                      .includes(search.toString().toLowerCase())
                  ) {
                    return row;
                  }
                  return 0;
                })
                .map((row) => (
                  <Card className="shadow m-3 box" style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Text>
                        <div
                          className="row"
                          style={{
                            borderBottom: "1px solid #B0BEC5",
                            color: "#616161",
                          }}
                        >
                          <div
                            style={{
                              display: "inline-block",
                              width: "250px",
                              fontSize: "23px",

                              fontWeight: "500",
                            }}
                          >
                            Subject:&emsp;{row.subject}
                          </div>

                          <div
                            style={{
                              display: "inline-block",
                              width: "250px",
                            }}
                          >
                            {row.year} {row.semester}
                          </div>
                        </div>
                        <div
                          className="row"
                          style={{ marginLeft: "10px", marginTop: "10px" }}
                        >
                          <div className="col-10">
                            <div
                              style={{
                                display: "inline-block",
                                width: "70px",
                              }}
                            >
                              Topic:
                            </div>
                            {row.topic} <br></br>
                            <div
                              style={{ display: "inline-block", width: "70px" }}
                            >
                              Date:
                            </div>
                            {row.date} <br></br>
                            <div
                              style={{ display: "inline-block", width: "70px" }}
                            >
                              Time:
                            </div>
                            {row.time} <br></br>
                          </div>

                          <div
                            className="row "
                            style={{ display: "flex", justifyContent: "right" }}
                          >
                            <div className="col-auto">
                              <Button
                                className="mx-1"
                                variant="info"
                                size="sm"
                                block
                                onClick={() => getLecturesByid(row._id)}
                              >
                                More&nbsp;
                                <i class="fa-solid fa-circle-info"></i>
                              </Button>
                              <Button
                                className="mx-1"
                                variant="danger"
                                size="sm"
                                block
                                onClick={() => deleteLecture(row._id)}
                              >
                                Delete&nbsp;
                                <i class="fa fa-trash" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
