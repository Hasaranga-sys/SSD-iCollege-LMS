const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const router = require("./Router/NoticeRouter");
const resour = require("./Router/LibraryItemRouter");
const userRouter = require("./Router/UserRouter");
const libraryItemRouter = require("./Router/LibraryItemRouter");
const LectureRouter = require("./Router/LectureRouter");

app.use(express.json());
app.use(cors());
app.use("/notice", router);
app.use("/user", userRouter);
app.use("/Lecture", LectureRouter);

// app.use("/libarary", libraryItemRouter);
//app.use("/resource",resour )
app.use(cors());
app.use("/pdf", require("./Router/LibraryItemRouter"));
// app.use("/lecture", require("./Router/LectureRouter"));

mongoose
  .connect(
    // "mongodb+srv://has:has123@icollegelms.vpl6dxd.mongodb.net/?retryWrites=true&w=majority"
    "mongodb+srv://root:root@cluster0.cfjqiom.mongodb.net/"
  )
  .then(() => console.log("Connected to database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
