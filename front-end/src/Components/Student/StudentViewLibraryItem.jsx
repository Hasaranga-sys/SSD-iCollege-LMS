import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../Lecture/grid.css";
import { Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import print from "print-js";

function StudentViewLibraryItem() {
  const [items, setItems] = useState();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilers = async () => {
      const res = await fetch(`http://localhost:5000/pdf`);
      const data = await res.json();
      setItems(data);
    };
    fetchFilers();
  }, []);

  console.log(items);

  const clickDownload = (pdf) => {
    <Link to={pdf}></Link>;
    console.log(pdf);
  };

  return (
    <div>
      <br></br>
      <center>
        <h1>Library Resources</h1>
      </center>

      <div>
        <div className="row">
          <div>
            <div className=" container  d-flex flex-row">
              <select
                className="form-control
                              mt-3 admin-srchbr1"
                onChange={(e) => setSearch(e.target.value)}
                // value={category}
                // name="User_Category"
              >
                <option value="">Select Faculty </option>
                <option value="Faculty of Computing">
                  Faculty of Computing
                </option>
                <option value="Faculty of Busines">Faculty of Busines</option>
                <option value="Faculty of Engineering">
                  Faculty of Engineering
                </option>
              </select>

              <select
                className="form-control
                              mt-3 admin-srchbr1"
                onChange={(e) => setSearch(e.target.value)}
                // value={category}
                // name="User_Category"
              >
                <option value="">Select Subject </option>

                <option value="AF-SE3040">AF-SE3040</option>
                <option value="OOP-SE3060">OOP-SE3060</option>
                <option value="DS-SE3070">DS-SE3070</option>
                <option value="MAD-SE3090">MAD-SE3090</option>
              </select>

              <button
                type="button"
                className="btn btn-success mt-3 admin-cad"
                onClick={() =>
                  print({
                    printable: items,
                    header: " Details",
                    properties: [
                      {
                        field: "faculty",
                        displayName: "Faculty",
                      },
                      { field: "year", displayName: "Year" },
                      { field: "subject", displayName: "Subject" },
                      {
                        field: "pdf",
                        displayName: "Pdf Url",
                      },
                    ],
                    type: "json",
                  })
                }
              >
                print Details &nbsp;
                <i class="fa fa-print" aria-hidden="true"></i>{" "}
              </button>
            </div>
            <div className="container grid  ">
              {items
                ?.filter((value) => {
                  if (search == "") {
                    return value;
                  } else if (
                    //  value.pid.toString(includes(search)) ||
                    value.faculty
                      .toString()
                      .toLowerCase()
                      .includes(search.toString().toLowerCase()) ||
                    value.subject
                      .toString()
                      .toLowerCase()
                      .includes(search.toString().toLowerCase())
                  ) {
                    return value;
                  }
                  return 0;
                })
                .map((row) => (
                  <Card
                    className="m-3 box shadow box-shadow"
                    style={{ width: "18rem" }}
                  >
                    <Card.Header>
                      <div className="row">
                        <div
                          style={{
                            display: "inline-block",
                            width: "250px",
                            fontSize: "20px",
                          }}
                        >
                          Faculty: &emsp; {row.faculty}
                        </div>
                        <div
                          style={{ display: "inline-block", width: "250px" }}
                        >
                          Year:&emsp;{row.year}
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <div className="row">
                          {/* <div className="col-10">
                    <strong
                      style={{
                        display: "inline-block",
                        width: "100px",
                      }}
                    >
                      faculty:
                    </strong>
                    {row.faculty}
                  </div> */}
                          Subject:&emsp;{row.subject}
                          <div
                            className="row "
                            style={{ display: "flex", justifyContent: "right" }}
                          >
                            <div className="col-auto">
                              <a href={row.pdf} download>
                                Download
                              </a>

                              {/* <Button
                        className="mx-1"
                        variant="info"
                        size="sm"
                        block
                        // onClick={() => clickDownload(row.pdf)}
                      >
                        Download 
                      </Button> */}
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

export default StudentViewLibraryItem;
