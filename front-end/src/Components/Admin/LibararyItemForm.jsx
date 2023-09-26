import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LibraryService from "../Service/LibraryService";
import SubjectService from "../Service/SubjectService";

const LibararyItemForm = () => {
  const [faculty, setFaculty] = useState("");
  const [year, setYear] = useState(0);
  const [subject, setsubject] = useState("");
  const [pdf, setPdf] = useState("");
  const { id } = useParams();
  const history = useNavigate();

  //const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    console.log("hiii");

    // SubjectService.getAllSubject().then((res)=>{
    //   setSubjectList(res.data);
    // })

    // selectFaculty();
    // console.log("fac",faculty);

    if (id) {
      LibraryService.getItemById(id).then((res) => {
        console.log(res);
        setFaculty(res.data.pdf.faculty);
        setYear(res.data.pdf.year);
        setsubject(res.data.pdf.subject);
        setPdf(res.data.pdf.pdf);
      });
    }
  }, []);

  console.log("p", pdf);

  const title = () => {
    if (id) {
      return <h1>Update Library Resources </h1>;
    } else {
      return <h1>Add Library Resources </h1>;
    }
  };

  // const selectFaculty = (e) => {

  //   console.log("fac",faculty);
  //   console.log("e",e.target.value);

  //   setFaculty(e.target.value)

  //   // if(faculty.length > 0){
  //   //   console.log("fac",faculty);

  //   // }
  //   subjectList.forEach((p) => {
  //     if (p.faculty == e.target.value)
  //       console.log("vvv", p.subject);
  //       setSubjectList(...p, p)
  //   })
  // }

  const clickSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("faculty", faculty);
      data.append("year", year);
      data.append("subject", subject);

      for (var x = 0; x < pdf.length; x++) {
        data.append("uploaded_Image", pdf[x]);
      }

      if (id) {
        const res = await fetch(`http://localhost:5000/pdf/${id}`, {
          method: "PUT",
          body: data,
        });
        if (res.ok) {
          setFaculty("");
          setYear("");
          setsubject("");
          setPdf(null);

          Swal.fire(" Succesfull Update");
          history("/AdminHome/ViewLibararyItems");
        }
      } else {
        const res = await fetch(`http://localhost:5000/pdf`, {
          method: "POST",
          body: data,
        });
        if (res.ok) {
          setFaculty("");
          setYear("");
          setsubject("");
          setPdf(null);

          Swal.fire(" Succesfull.");
          history("/AdminHome/ViewLibararyItems");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="shadow card w-50 mx-auto text-center p-3 mt-5 mb-5">
        <div>
          <div className="card-body">
            <div>
              <center>{title()}</center>
            </div>
            <br />
            <br />
            <form onSubmit={clickSubmit} encType="multipart/form-data">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <strong
                      style={{
                        display: "inline-block",
                        width: "100px",
                      }}
                    >
                      Faculty:
                    </strong>

                    {/* <input
                  type="text"
                  placeholder="Group ID"
                  value={faculty}
                  required
                  onChange={(e) => setFaculty(e.target.value)}
                  className="form-control"
                /> */}

                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e) => setFaculty(e.target.value)}
                      //onChange={(e) => setFaculty(e.target.value)}
                      value={faculty}
                      required="required"
                    >
                      {/* <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    // onChange={selectCategory}
                    onChange={(e) => setFaculty(e.target.value)}
                    value={faculty}
                    required="required"
                  > */}
                      <option value="">Choose...</option>
                      <option value="Faculty of Computing">
                        Faculty of Computing
                      </option>
                      <option value="Faculty of Business">
                        Faculty of Busines
                      </option>
                      <option value="Faculty of Engineering">
                        Faculty of Engineering
                      </option>
                    </select>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="col">
                  <div className="form-group">
                    <strong
                      style={{
                        display: "inline-block",
                        width: "100px",
                      }}
                    >
                      Year:
                    </strong>

                    {/* <input
                  type="text"
                  placeholder="Group ID"
                  required
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                  className="form-control"
                /> */}

                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
                      required="required"
                    >
                      <option value="">Choose...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <strong
                      style={{
                        display: "inline-block",
                        width: "100px",
                      }}
                    >
                      Subject:
                    </strong>

                    {/* <input
                  type="text"
                  placeholder="Group ID"
                  required
                  onChange={(e) => setsubject(e.target.value)}
                  value={subject}
                  className="form-control"
                /> */}

                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e) => setsubject(e.target.value)}
                      value={subject}
                      required="required"
                    >
                      <option value="">Choose...</option>
                      <option value="AF-SE3040">AF-SE3040</option>
                      <option value="OOP-SE3060">OOP-SE3060</option>
                      <option value="DS-SE3070">DS-SE3070</option>
                      <option value="MAD-SE3090">MAD-SE3090</option>

                      {/* {subjectList.map((t)=>(
                      <option key={t._id} value={t.subject}>{t.subject}</option>
                    ))} */}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <strong
                  style={{
                    display: "inline-block",
                    width: "100px",
                  }}
                >
                  File:
                </strong>
                <div className="form-group">
                  <input
                    type="file"
                    multiple
                    required
                    filename="uploaded_Image"
                    className="form-control"
                    onChange={(e) => {
                      setPdf(e.target.files);
                    }}
                    //value={pdf}
                  />
                </div>
              </div>

              <br />
              <br />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibararyItemForm;
