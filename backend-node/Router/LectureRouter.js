const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const PDF = require("../Model/LectureModel");
const cloudinary = require("../utils/cloudinary");
const LecuteContoller = require("../Controller/LectureController");

const files = [];
const fileInArray = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let filePath = [];
    console.log("MULTER ENTRY", file.originalname);
    console.log("FILES", req.files);

    const ext = path.extname(file.originalname);
    const id = uuid();
    filePath = `${id}${ext}`;
    fileInArray.push([filePath]);
    console.log("IN ARRAY ", filePath);
    files.push(fileInArray);
    console.log("PUSHED MAIN ARRAY", fileInArray);
    cb(null, filePath);
    console.log("current length", files.length);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, jpg, .jpeg and .pdf format allowed!"));
    }
  },
  storage: storage,
});

router.post("/", upload.array("uploaded_Image", 10), async (req, res) => {
  try {
    console.log(req.files.length);
    console.log("Files", fileInArray);
    // let img;

    let pdff;

    for (let i = 0; i < fileInArray.length; i++) {
      let fileext = fileInArray[i][0].split(".")[1];
      console.log(path.resolve(__dirname, "../uploads"));
      // if(fileext=='jpg' || fileext=='png' || fileext=='jpeg')
      // img = await cloudinary.uploader.upload(`${path.resolve(__dirname, "../uploads")}/${fileInArray[i][0]}`);

      if (fileext == "pdf")
        pdff = await cloudinary.uploader.upload(
          `${path.resolve(__dirname, "../uploads")}/${fileInArray[i][0]}`,
          { pages: true }
        );
    }
    let pdf = new PDF({
      year: req.body.year,
      semester: req.body.semester,
      topic: req.body.topic,
      subject: req.body.subject,
      date: req.body.date,
      time: req.body.time,
      discription: req.body.discription,
      meeting_link: req.body.meeting_link,

      // avatar:img.secure_url,
      pdf: pdff.secure_url,
      // cloudinary_id_img: img.public_id,
      cloudinary_id_pdf: pdff.public_id,
    });

    await pdf.save();
    res.json(pdf);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let pdf = await PDF.find();
    res.json(pdf);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let pdf;
  try {
    pdf = await PDF.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!pdf) {
    return res.status(404).json({ message: "cannot delete" });
  }
  return res.status(200).json({ message: `topic ${id} deleted` });
});

// update
router.put("/:id", upload.array("uploaded_Image", 10), async (req, res) => {
  const id = req.params.id;
  try {
    console.log(req.files.length);
    console.log("Files", fileInArray);
    // let img;

    let pdff;

    for (let i = 0; i < fileInArray.length; i++) {
      let fileext = fileInArray[i][0].split(".")[1];
      console.log(path.resolve(__dirname, "../uploads"));
      // if(fileext=='jpg' || fileext=='png' || fileext=='jpeg')
      // img = await cloudinary.uploader.upload(`${path.resolve(__dirname, "../uploads")}/${fileInArray[i][0]}`);

      if (fileext == "pdf")
        pdff = await cloudinary.uploader.upload(
          `${path.resolve(__dirname, "../uploads")}/${fileInArray[i][0]}`,
          { pages: true }
        );
    }
    let pdf = await PDF.findByIdAndUpdate(id, {
      year: req.body.year,
      semester: req.body.semester,
      topic: req.body.topic,
      subject: req.body.subject,
      date: req.body.date,
      time: req.body.time,
      discription: req.body.discription,
      meeting_link: req.body.meeting_link,

      // avatar:img.secure_url,
      pdf: pdff.secure_url,
      // cloudinary_id_img: img.public_id,
      cloudinary_id_pdf: pdff.public_id,
    });
    await pdf.save();
    res.json(pdf);
  } catch (err) {
    console.log(err);
  }
});

// router.get("/", LectureController.getAllLecture);
// router.post("/", LecuteContoller.addLecture);
router.get("/:id", LecuteContoller.getLectureById);
// router.put("/:id",LectureController.updateNotice);
// router.delete("/:id", LectureController.DeleteLecture);

module.exports = router;
