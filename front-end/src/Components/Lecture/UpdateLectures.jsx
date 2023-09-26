import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LectureService from "../Service/LectureService";
import Swal from "sweetalert2";

export default function UpdateLectures() {
  const { id } = useParams();
  const mystyle = { backgroundColor: "#FAFAFA" };

  const navigate = useNavigate();
  const [getLectureByid, setGetLectureByid] = useState([]);

  const [semester, setSemester] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [discription, setDiscription] = useState("");
  const [meeting_link, setMeeting_link] = useState("");
  const [year, setYear] = useState("");
  const [pdf, setPdf] = useState("");

  const cancelButton = async () => {
    navigate("/Lecture");
  };

  const clickSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("year", year);
      data.append("subject", subject);
      data.append("semester", semester);
      data.append("topic", topic);
      data.append("date", date);
      data.append("time", time);
      data.append("meeting_link", meeting_link);
      data.append("discription", discription);
      // data.append("lecture",lecture);

      for (var x = 0; x < pdf.length; x++) {
        data.append("uploaded_Image", pdf[x]);
      }

      const res = await fetch(`http://localhost:5000/Lecture/${id}`, {
        method: "PUT",
        body: data,
      });
      if (res.ok) {
        setYear("");
        setSubject("");
        setSemester("");
        setTopic("");
        setDate("");
        setTime("");
        setDiscription("");
        setMeeting_link("");
        // setLecture("")
        setPdf(null);

        navigate("/Lecture");
        Swal.fire({
          icon: "success",
          text: "Lecture scheduled successfully updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LectureService.getLectureById(id).then((res) => {
      setGetLectureByid([res.data]);
      setYear(res.data.year);
      setSubject(res.data.subject);
      setSemester(res.data.semester);
      setTopic(res.data.topic);
      setDate(res.data.date);
      setTime(res.data.time);
      setDiscription(res.data.discription);
      setMeeting_link(res.data.meeting_link);
      setPdf(res.data.pdf);
    });
  }, []);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3" style={mystyle}>
          <div className="row">
            <div
              className="col"
              style={{
                fontSize: 30,
                fontWeight: 500,
                paddingLeft: 50,
                display: "block",
                marginTop: "auto",
                marginBottom: "auto",
                color: "#90A4AE",
              }}
            >
              Edit Lectures.
              <p
                class="text-muted"
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                The Academic Staff can schedule edit lessons in here.
              </p>
            </div>
            <div
              className="lecture-image"
              style={{ height: "130px", width: "150px" }}
            ></div>
          </div>
          <div className="card-body">
            <form onSubmit={clickSubmit}>
              <div className="row form-group pb-4">
                <div className="col-lg-3 col-md-6">
                  <label> Year and semester: </label>
                </div>
                <div className="row col-lg-9 col-md-7">
                  <div className="col-lg-6">
                    <select
                      name="year"
                      className="form-control"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option selected>Select year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  <div className=" col-lg-6">
                    <select
                      name="semester"
                      className="form-control"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                    >
                      <option selected>Select Semester</option>
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row form-group pb-4">
                <div className="col-lg-3 col-md-5">
                  <label> Subject: </label>
                </div>
                <div className="col-lg-9 col-md-7">
                  <input
                    placeholder="Enter subject"
                    name="subject"
                    className="form-control"
                    title="Name should only contain lowercase or uppercase letters. e.g. john"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>
              <div className="row form-group pb-4">
                <div className="col-lg-3 col-md-5">
                  <label> Lecture topic: </label>
                </div>
                <div className="col-lg-9 col-md-7">
                  <input
                    placeholder="Enter Topic"
                    name="topic"
                    className="form-control"
                    title="Name should only contain lowercase or uppercase letters. e.g. john"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </div>
              <div className="row form-group pb-4">
                <div className="col-lg-3 col-md-5">
                  <label> Date and time: </label>
                </div>
                <div className="row col-lg-9 col-md-7">
                  <div className="col-lg-6">
                    <input
                      placeholder="Enter date"
                      type="date"
                      className="form-control"
                      title="Name should only contain lowercase or uppercase letters. e.g. john"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className=" col-lg-6">
                    <input
                      placeholder="Enter time"
                      type="time"
                      className="form-control"
                      title="Name should only contain lowercase or uppercase letters. e.g. john"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row form-group pb-4">
                <div className="col-lg-3 col-md-5">
                  <label> Discription: </label>
                </div>
                <div className="col-lg-9 col-md-7">
                  <input
                    placeholder="Enter Discription"
                    name="firstName"
                    className="form-control"
                    title="Name should only contain lowercase or uppercase letters. e.g. john"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                  />
                </div>
              </div>
              <div className="row form-group pb-4">
                <div className="col-lg-3 col-md-5">
                  <label> Meeting link: </label>
                </div>
                <div className="col-lg-9 col-md-7">
                  <input
                    placeholder="Meeting Link"
                    name="firstName"
                    className="form-control"
                    title="Name should only contain lowercase or uppercase letters. e.g. john"
                    value={meeting_link}
                    onChange={(e) => setMeeting_link(e.target.value)}
                  />
                </div>
              </div>
              <div className="row form-group pb-4">
                <div className="col-lg-3 col-md-5">
                  <label> Lecture slide: </label>
                </div>

                <div className="col-lg-9 col-md-7">
                  <a href={pdf} download>
                    {subject}
                    {topic}
                  </a>
                  <input
                    type="file"
                    multiple
                    required
                    filename="uploaded_Image"
                    className="form-control"
                    onChange={(e) => {
                      setPdf(e.target.files);
                    }}
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={() => cancelButton()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
