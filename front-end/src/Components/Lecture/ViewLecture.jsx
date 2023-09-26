import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import LectureService from "../Service/LectureService";

import Modal from "react-bootstrap/Modal";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewLecture(params) {
  const { id } = useParams();
  console.log(id);
  const [show, setShow] = useState(false);
  const [getLectureByid, setGetLectureByid] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const getLecturesByid = (id) => {
  //     LectureService.getLectureById(id).then((res) => {
  //       setGetLectureByid(res.data);
  //       console.log(res.date);
  //       setShow(true);
  //     });
  //   };

  useEffect(() => {
    const getAllLecture = () => {
      LectureService.getLectureById(id).then((res) => {
        setGetLectureByid([res.data]);
        console.log([res.data]);
        setShow(true);
      });
    };
    getAllLecture();
  }, []);

  return (
    <div>
      {" "}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {getLectureByid.map((row) => (
              <Card className="m-3 box" style={{ width: "18rem" }}>
                <Card.Header>
                  <div className="row">
                    <div style={{ display: "inline-block", width: "250px" }}>
                      Subject:&emsp;{row.subject}
                    </div>
                    {row.year} {row.semester}
                  </div>
                </Card.Header>
                <Card.Body style={{ backgroundColor: "#E1F5FE" }}>
                  <Card.Text>
                    <div className="row">
                      <div className="col-10">
                        <strong
                          style={{ display: "inline-block", width: "100px" }}
                        >
                          Topic:
                        </strong>
                        {row.topic} <br></br>
                        <strong
                          style={{ display: "inline-block", width: "100px" }}
                        >
                          Date:
                        </strong>
                        {row.date} <br></br>
                        <strong
                          style={{ display: "inline-block", width: "100px" }}
                        >
                          Time:
                        </strong>
                        {row.time} <br></br>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
