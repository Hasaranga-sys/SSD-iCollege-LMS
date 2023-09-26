import React from "react";
import { Route, Routes } from "react-router-dom";
import AddLibararyItem from "./Components/Admin/AddLibararyItem";
import AdminHome from "./Components/Admin/AdminHome";

import NoticeForm from "./Components/Admin/NoticeForm";
import NoticeTable from "./Components/Admin/NoticeTable";
import ViewLibraryItems from "./Components/Admin/ViewLibraryItems";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import StudentHome from "./Components/Student/StudentHome";
import ViewNotice from "./Components/Student/ViewNotice";
import UserForm from "./Components/UserManagement/UserForm";
import LoginForm from "./Components/UserManagement/UserLogin";
import UserList from "./Components/UserManagement/UserList";
import LibararyItemForm from "./Components/Admin/LibararyItemForm";
import AddLecture from "./Components/Lecture/AddLecture";
import LectureHome from "./Components/Lecture/LectureHome";
import ViewLecture from "./Components/Lecture/ViewLecture";
import GetLectureById from "./Components/Lecture/GetLectureById";
import LectureDash from "./Components/Lecture/LectureDash";
import ViewLectureT from "./Components/Lecture/ViewLectureT";
import StudentViewLibraryItem from "./Components/Student/StudentViewLibraryItem";
import UpdateLectures from "./Components/Lecture/UpdateLectures";
import LectureAdminHome from "./Components/Lecture/LectureAdminHome";
import AnnouncemntViewPro from "./Components/Admin/AnnouncemntViewPro";
import Foot from "./Components/Foot";
import StudentLectuersView from "./Components/Student/StudentLectuersView";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LoginForm />} exact />

            {/* admin */}
            <Route path="/AdminHome" element={<AdminHome />} exact />
            <Route
              path="/AdminHome/NoticeTable"
              element={<NoticeTable />}
              exact
            />
            <Route
              path="/AdminHome/NoticeTable/NoticeForm"
              element={<NoticeForm />}
              exact
            />
            <Route
              path="/AdminHome/NoticeTable/NoticeForm/:_id"
              element={<NoticeForm />}
              exact
            />
            <Route path="/annvp/:_id" element={<AnnouncemntViewPro />} exact />

            <Route
              path="/AdminHome/addLibararyItemForm"
              element={<LibararyItemForm />}
              exact
            />
            <Route
              path="/AdminHome/updateLibararyItemForm/:id"
              element={<LibararyItemForm />}
              exact
            />
            <Route
              path="/AdminHome/LibararyItemForm/:id"
              element={<LibararyItemForm />}
              exact
            />
            <Route
              path="/AdminHome/LibararyItemForm/:id"
              element={<LibararyItemForm />}
              exact
            />
            <Route
              path="/AdminHome/ViewLibararyItems"
              element={<ViewLibraryItems />}
              exact
            />

            <Route path="/StudentHome" element={<StudentHome />} exact />
            <Route
              path="/StudentHome/viewLibrarayItem"
              element={<StudentViewLibraryItem />}
              exact
            />

            {/* Lecture */}
            <Route
              path="/LectureHome/AddLecture"
              element={<AddLecture />}
              exact
            />
            <Route path="/viewlecture" element={<ViewLectureT />} exact />

            {/* user management */}
            <Route path="/user/:id" element={<UserForm />} exact />
            <Route path="/login" element={<LoginForm />} exact />
            <Route path="/users" element={<UserList />} exact />

            {/* <Route path="/Lecture" element={<LectureHome />} exact /> */}
            {/* <Route path="/Lecture/AddLecture" element={<AddLecture />} exact />
            <Route path="/Lecture/:Id" element={<ViewLectureT />} exact /> */}

            <Route path="/Lecture" element={<LectureHome />} exact />
            <Route path="/Lecture/AddLecture" element={<AddLecture />} exact />
            <Route path="/Lecture/:id" element={<ViewLecture />} exact />
            <Route
              path="/UpdateLecture/:id"
              element={<UpdateLectures />}
              exact
            />
            <Route path="/LectureHome" element={<LectureDash />} exact />
            <Route
              path="/AdminHome/LectureDetails"
              element={<LectureAdminHome />}
              exact
            />
            <Route
              path="/StudentHome/LectureDetails"
              element={<StudentLectuersView />}
              exact
            />
          </Routes>
        </main>
      </React.Fragment>
    </div>
  );
}
export default App;
