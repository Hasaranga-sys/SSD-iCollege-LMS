const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const router = require("./Router/NoticeRouter");
const resour = require("./Router/LibraryItemRouter");
const userRouter = require("./Router/UserRouter");
const libraryItemRouter = require("./Router/LibraryItemRouter");
const LectureRouter = require("./Router/LectureRouter");
const https = require("https");
const fs = require("fs");

//added hasa
const csrf = require('csurf');
const cookieParser = require("cookie-parser"); // Add cookie-parser middleware

const {
  CustomValidationError,
  CustomNotFoundError,
  CustomServerError,
} = require("./Error/Error");


const passport = require("passport");
const cookieSession = require("cookie-session");
const authRoute = require("./Router/auth");

const privateKey = fs.readFileSync("./Auth/auth-key.pem", "utf8");
const certificate = fs.readFileSync("./Auth/auth-cert.pem", "utf8");
// const ca = fs.readFileSync('path/to/intermediate-certificate.pem', 'utf8'); // If you have intermediate certificates

const credentials = {
  key: privateKey,
  cert: certificate,
  // ca: ca, // Include this line if you have intermediate certificates
};

// Set up CORS for your app with the allowed origin and credentials.
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

//hasa added
//Initialize the csurf middleware
const csrfProtection = csrf({
  cookie: true, 
});

//csurfProtection middleware
// app.use(csrfProtection);

app.use("/auth", authRoute);
app.use("/notice", router);
app.use("/user", userRouter);
app.use("/Lecture", LectureRouter);
app.use("/pdf", require("./Router/LibraryItemRouter"));

//csurfProtection middleware
app.use(csrfProtection);

// custom error handler middleware
app.use((err, req, res, next) => {
  // Log the error (without sensitive data)
  console.error(err.message);

  //  error response object with a default message
  let errorResponse = {
    message: "An error occurred while processing your request.",
  };


  let statusCode = 500;

  // Handle known custom error types
  if (err instanceof CustomValidationError) {
    errorResponse.message = "Validation failed. Please check your input.";
    errorResponse.errors = err.errors; // Include specific validation errors
    statusCode = 400; 
  } else if (err instanceof CustomNotFoundError) {
    errorResponse.message = "Resource not found.";
    statusCode = 404; 
  } else if (err instanceof CustomServerError) {
    errorResponse.message = "Internal server error.";
    statusCode = 500; 
  }

  // Send the error response with the appropriate status code
  res.status(statusCode).json(errorResponse);
});



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
const portNumber = 443;

mongoose
  .connect("mongodb+srv://root:root@cluster0.cfjqiom.mongodb.net/")
  .then(() => {
    console.log("Connected to the database");
    httpsServer.listen(portNumber, () => {
      console.log("Server is running on HTTPS port " + portNumber);
    });
  })
  .catch((err) => console.log(err));
