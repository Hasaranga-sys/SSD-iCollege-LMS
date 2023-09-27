const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const router = require("./Router/NoticeRouter");
const resour = require("./Router/LibraryItemRouter");
const userRouter = require("./Router/UserRouter");
const libraryItemRouter = require("./Router/LibraryItemRouter");
const LectureRouter = require("./Router/LectureRouter");
const https = require('https');
const fs = require('fs');

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

const privateKey = fs.readFileSync('./Auth/auth-key.pem', 'utf8');
const certificate = fs.readFileSync('./Auth/auth-cert.pem', 'utf8');
// const ca = fs.readFileSync('path/to/intermediate-certificate.pem', 'utf8'); // If you have intermediate certificates

const credentials = {
  key: privateKey,
  cert: certificate,
  // ca: ca, // Include this line if you have intermediate certificates
};

// mongoose
//   .connect(
//     // "mongodb+srv://has:has123@icollegelms.vpl6dxd.mongodb.net/?retryWrites=true&w=majority"
//     "mongodb+srv://root:root@cluster0.cfjqiom.mongodb.net/"
//   )
//   .then(() => console.log("Connected to database"))
//   .then(() => {
//     app.listen(5001);
//   })
//   .catch((err) => console.log(err));

// 1. go to this link on crome (" chrome://flags/#allow-insecure-localhost ")
// 2. Enable the "Allow invalid certificates for resources loaded from localhost" flag.
// 3. Restart Chrome.

const httpsServer = https.createServer(credentials, app);
const portNumber = 443

mongoose
  .connect('mongodb+srv://root:root@cluster0.cfjqiom.mongodb.net/')
  .then(() => console.log('Connected to database'))
  .then(() => {
    httpsServer.listen(portNumber, () => {
      console.log('Server is running on HTTPS port ' + portNumber);
    });
  })
  .catch((err) => console.log(err));
