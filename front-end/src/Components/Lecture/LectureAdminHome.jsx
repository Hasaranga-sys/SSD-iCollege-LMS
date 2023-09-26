import React, { useEffect, useState } from "react";
import LectureService from "../Service/LectureService";

export default function LectureAdminHome() {
  const [lectureList, setLectureList] = useState([]);
  //   const navigate = useNavigate();
  useEffect(() => {
    const getLectures = () => {
      LectureService.getAllLecturers().then((res) => {
        setLectureList(res.data);
        console.log(res.data);
      });
    };

    getLectures();
  }, []);

  return (
    <div>
      <div className="card mx-5">
        <div className="card-body">
          {/* <button onClick={AddStudent}>Add student</button> */}
          <h1>User list</h1>

          <table class="table table-striped mt-3">
            <thead className="table-primary">
              <tr>
                <th scope="col">Lectures Info</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Discription</th>
                <th scope="col">Grade</th>
                <th scope="col">Lecture Slide</th>
                <th scope="col">Meeting Link</th>

                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {lectureList.map((lecture) => (
                <tr key={lecture._id}>
                  <td>
                    <div>
                      <strong>Subject:</strong> {lecture.subject}
                      <br></br>
                      <strong>Topic: </strong>
                      {lecture.topic}
                    </div>
                  </td>
                  <td style={{ width: "15%" }}>
                    <div>
                      <strong>Time:</strong> {lecture.time}
                      <br></br>
                      <strong>Date: </strong>
                      {lecture.date}
                    </div>
                  </td>

                  <td style={{ width: "20%" }}>{lecture.discription}</td>
                  <td>
                    {lecture.year}
                    <br></br> {lecture.semester}
                  </td>
                  <td style={{ width: "15%" }}>
                    <a href={lecture.pdf} download>
                      {lecture.subject}_{lecture.topic}
                    </a>
                  </td>
                  <td style={{ width: "15%" }}>
                    <a href={lecture.meeting_link}>
                      {lecture.topic}_{lecture.date}_{lecture.time}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
