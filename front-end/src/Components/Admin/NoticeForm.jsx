import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticeService from "../Service/NoticeService";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import "../Admin/Admin.css";
import DOMPurify from "dompurify";
const NoticeForm = ({ csrfToken }) => {
  const [faculty, setFaculty] = useState([]);
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [notice, setNotice] = useState("");
  const [calander, setCalander] = useState(new Date());
  const [errors, setErrors] = useState({});

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      NoticeService.getNoticeById(_id).then((response) => {
        setTopic(response.notices.topic);
        setFaculty(response.notices.faculty);
        setDate(response.notices.date);
        setNotice(response.notices.notice);
        console.log(response.notices.notice);
      });
    }
  }, [_id]);



  // Function to validate the form
  const validateForm = () => {
    const validationErrors = {};

    if (!faculty) {
      validationErrors.faculty = "Faculty is required";
    }

    if (!date) {
      validationErrors.date = "Date is required";
    }

    if (topic.length < 5) {
      validationErrors.topic = "Topic must be at least 5 characters long";
    }

    if (notice.length < 5) {
      validationErrors.notice = "Notice must be at least 5 characters long";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const submitNotice = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        faculty,
        date,
        topic,
        notice,
      };
    } catch (error) {
      console.error("Error submitting notice:", error);
    }
    const notices = { faculty, date, topic, notice };

    if (_id) {
      NoticeService.updateNotice(_id, notices).then((response) => {
        Swal.fire("Success", "Notice Updated Successfully", "success");
        navigate("/AdminHome/NoticeTable");
      });
    } else {
      NoticeService.createNotice(notices)
        .then((response) => {
          Swal.fire("Success", "Notice Added Successfully", "success");
          navigate("/AdminHome/NoticeTable");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="row">
        <div
          class="card  text-bg-white adminNotice-table mb-3 mt-5 text-center"
          style={{ maxWidth: 900, marginLeft: 180, borderRadius: 30 }}
        >
          <div class="card-body">
            <h2 class="card-title mt-1">Add Notice</h2>
            <form onSubmit={submitNotice}>
              <div>
                <div className="row w-50  mx-auto mt-5">
                  <strong className="col-sm-3  col-form-label">Faculty</strong>

                  <select
                    class="form-select w-75"
                    aria-label="Default select example"
                    value={faculty}
                    required
                    placeholder="SelectFaculty.."
                    onChange={(e) => {
                      setFaculty(e.target.value);
                      setErrors({ ...errors, faculty: "" });
                    }}
                  >
                    <option value="">Select faculty </option>
                    <option value="Faculty of Computing">
                      Faculty of Computing
                    </option>
                    <option value="Faculty of Business">
                      Faculty of Business
                    </option>
                    <option value="Faculty of Engineering">
                      Faculty of Engineering
                    </option>
                    {errors.faculty && (
                      <div className="text-danger">{errors.faculty}</div>
                    )}
                  </select>
                </div>
                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Date
                  </strong>
                  <input
                    name="date"
                    className="form-control w-75"
                    placeholder="Add Topic..."
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setErrors({ ...errors, date: "" });
                    }}
                    style={{ marginLeft: 9 }}
                    required
                  />
                  {errors.date && (
                    <div className="text-danger">{errors.date}</div>
                  )}
                </div>
                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    Topic
                  </strong>
                  <input
                    name="topic"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add Topic..."
                    type="text"
                    value={DOMPurify.sanitize(topic)}
                    minLength="5"
                    onChange={(e) => {
                      setTopic(e.target.value);
                      setErrors({ ...errors, topic: "" });
                    }}
                    required
                  />
                  {errors.topic && (
                    <div className="text-danger">{errors.topic}</div>
                  )}
                </div>

                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -3 }}
                    className="col-sm-3  col-form-label"
                  >
                    Notice
                  </strong>

                  <textarea
                    name="notice"
                    style={{ marginLeft: 3 }}
                    className="form-control w-75"
                    placeholder="Add notice...."
                    type="text"
                    value={DOMPurify.sanitize(notice)}
                    minLength="5"
                    onChange={(e) => {
                      setNotice(e.target.value);
                      setErrors({ ...errors, notice: "" });
                    }}
                    required
                  />
                  {errors.notice && (
                    <div className="text-danger">{errors.notice}</div>
                  )}
                </div>

                <div
                  className="row w-50 mx-auto mt-3 mb-4 "
                  style={{ borderRadius: 30 }}
                >
                  <input
                    className="btn btn-primary mt-4 mx-auto shadow-lg"
                    type="submit"
                    value="Save"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          class="card  text-bg-white shadow-lg mb-3 mt-5 text-center p-4"
          style={{ maxWidth: 350, marginLeft: 50 }}
        >
          <Calendar setCalander={setCalander} value={calander}></Calendar>
        </div>
      </div>
    </div>
  );
};

export default NoticeForm;
