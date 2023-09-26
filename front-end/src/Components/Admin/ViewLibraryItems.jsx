import React from "react";
import { useState, useEffect } from "react";
import LibraryService from "../Service/LibraryService";
import LibararyItemForm from "./LibararyItemForm";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import print from "print-js";
import { useParams } from "react-router";

function ViewLibraryItems() {
  const [pdfs, setPdfs] = useState();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilers = async () => {
      const res = await fetch(`http://localhost:5000/pdf`);
      const data = await res.json();
      setPdfs(data);
    };
    fetchFilers();
  }, []);

  console.log(pdfs);

  // const updateClicked = (id) => {
  //   console.log(id);

  // };

  const deleteClicked = (id) => {
    Swal.fire({
      title: "Do you want to delete ?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        console.log(id);
        LibraryService.deleteItem(id).then((res) => {
          setPdfs(pdfs.filter((pdfs) => pdfs._id !== id));
        });
      }
    });

    // Swal.fire(" succesfully deleted");
    // LibraryService.deleteItem(id).then((res) => {
    //   setPdfs(pdfs.filter((pdfs) => pdfs._id !== id));
    // });
  };

  //
  const updateClicked = (id) => {
    console.log(id);
    navigate(`/AdminHome/updateLibararyItemForm/${id}`);
  };

  const add = (e) => {
    e.preventDefault();
    navigate("/AdminHome/addLibararyItemForm");
  };

  return (
    <div>
      <div className="shadow card w-75 mx-auto text-center p-3 mt-5 mb-5">
        <h1>Library Resources</h1>

        <div>
          <div className="row">
            <div>
              <div className=" container  d-flex flex-row">
                <button
                  className="btn btn-primary mt-3 p-2"
                  style={{ width: 190 }}
                  onClick={add}
                >
                  Add Libraray Resources
                </button>

                <input
                  type="text"
                  placeholder="Search"
                  className="form-control
                              mt-3 admin-srchbr1"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

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

                <button
                  type="button"
                  className="btn btn-success mt-3 admin-cad"
                  onClick={() =>
                    print({
                      printable: pdfs,
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

              {/* <Link style={{marginLeft:20}} className="btn btn-primary w-25 mt-3"
                                                              to={"/AdminHome/addLibararyItemForm"}>Add Libraray </Link> */}

              {/* <input type="text" placeholder="search by " className="form-control" style={{
                                                                    marginTop:20, marginBottom:5,marginLeft:200, width:"20%"}}
                                                                    onChange={
                                                                        (e)=>{
                                                                            setSearch(e.target.value)}}/>
                                                                            <i className="search icon"></i> */}

              <div className=" p-2 mt-4 mb-4">
                <br />

                <div className="row">
                  <div className=" card mx-auto w-100">
                    <table class="table table-striped">
                      <thead className="table-primary">
                        <tr>
                          <th scope="col">Faculty</th>
                          <th scope="col">Year</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Document</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pdfs
                          ?.filter((value) => {
                            if (search === "") {
                              return value;
                            } else if (
                              //  value.pid.toString(includes(search)) ||
                              value.faculty
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                              value.subject
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return value;
                            }
                            return 0;
                          })

                          .map((pdf) => (
                            <tr key={pdf.id}>
                              <td>{pdf.faculty}</td>
                              <td>{pdf.year}</td>
                              <td>{pdf.subject}</td>
                              <td>
                                {
                                  <a href={pdf.pdf} download>
                                    {pdf.subject}
                                  </a>
                                }
                              </td>
                              <td>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => {
                                    updateClicked(pdf._id);
                                  }}
                                  style={{ marginRight: 10 }}
                                >
                                  Update &nbsp;
                                  <i class="fa fa-cog" aria-hidden="true"></i>
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deleteClicked(pdf._id);
                                  }}
                                >
                                  Delete &nbsp;
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewLibraryItems;
