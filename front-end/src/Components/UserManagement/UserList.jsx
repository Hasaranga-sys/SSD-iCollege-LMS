import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import UserServices from "../Service/UserServices";
import Swal from "sweetalert2";
import print from "print-js";
import "../Admin/Admin.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const UserList = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [adminFilter, setAdminFilter] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { userDetails, setUserDetails, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    UserServices.getAllUsers().then((res) => {
      setUser(res.data);
    });
    // console.log(userDetails);
    // console.log(isAuthenticated);
  });

  const AddStudent = (e) => {
    e.preventDefault();
    navigate("/user/-1");
  };
  const updteClicked = (id) => {
    // navigate(`/list/${id}`)
    navigate(`/user/${id}`);
  };
  const dleteClicked = (id) => {
    if (userDetails.userID == id) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Cant Delete own Accoount",
      });
    } else {
      Swal.fire({
        title: "Do you want to delete the user?",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        // denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "", "success");
          console.log(id);
          UserServices.deleteUser(id);
        }
        // else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        // }
      });

      // UserServices.deleteUser(id);
    }
    // console.log(id);
  };
  return (
    <div className="p-3">
      {/* <button
        className="btn btn-warning"
        onClick={() => {
          setUserDetails(null);
          setIsAuthenticated(false);
        }}
      >
        log out
      </button> */}
      <div
        className="shadow card w-100 text-center p-3 mt-5 mb-5"
        style={{ borderRadius: 30 }}
      >
        <h1>User List</h1>

        <div>
          <div className="container p-1 mt-4 mb-4">
            <div className="row">
              <div className="shadow card mx-auto w-100">
                <br></br>
                <div className=" container  d-flex flex-row">
                  <button
                    className="btn btn-primary mt-3 p-2"
                    style={{ width: 190 }}
                    onClick={AddStudent}
                  >
                    Add User
                  </button>
                  {/* <Link
                    className="btn btn-primary mt-3 p-2"
                    style={{ width: 190 }}
                    to={"/user/-1"}
                  >
                    Add User &nbsp;
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  </Link> */}

                  <input
                    type="text"
                    placeholder="search"
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
                    <option value="">Select Category </option>
                    <option value="admin">Admin</option>
                    <option value="lecture">Lectures</option>
                    <option value="student">Students</option>
                  </select>

                  <button
                    type="button"
                    className="btn btn-success mt-3 admin-cad"
                    onClick={() =>
                      print({
                        printable: user,
                        header: "User Details",
                        properties: [
                          {
                            field: "regNumber",
                            displayName: "Regitsteration ID",
                          },
                          { field: "lastName", displayName: "Last Name" },
                          { field: "initials", displayName: "Initials" },
                          {
                            field: "mobileNumber",
                            displayName: "Mobile number",
                          },
                          { field: "email", displayName: "Email" },
                          { field: "faculty", displayName: "Faculty" },
                          { field: "role", displayName: "Role" },
                        ],
                        type: "json",
                      })
                    }
                  >
                    print Details &nbsp;
                    <i className="fa fa-print" aria-hidden="true"></i>{" "}
                  </button>
                </div>

                <table className="table table-striped mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col"> Reg Number</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Initials</th>
                      <th scope="col">Mobile Number</th>
                      <th scope="col">Email</th>
                      <th scope="col">Department</th>
                      <th scope="col"> Role</th>
                      <th scope="col">Update</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user
                      .filter((val) => {
                        // if (search === "") {
                        //   return val;
                        // } else
                        if (
                          search === "" &&
                          val.role.toLowerCase().includes(category)
                        ) {
                          return val;
                        } else if (
                          val.regNumber
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          val.role
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          val.lastName
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          val.faculty
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          console.log(val);
                          return val;
                        }
                        return 0;
                      })

                      .map((user) => (
                        <tr key={user._id}>
                          <td>{user.regNumber}</td>
                          <td>{user.lastName}</td>
                          <td>{user.initials}</td>
                          <td>{user.mobileNumber}</td>
                          <td>{user.email}</td>
                          <td>{user.faculty}</td>
                          <td>{user.role}</td>

                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => updteClicked(user._id)}
                            >
                              Update
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => dleteClicked(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* <button
                  className="btn btn-primary w-25 mt-3"
                  onClick={AddStudent}
                >
                  Add User
                </button> */}
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserList;
