const LectureModel = require("../Model/LectureModel");
//getAll
const getAllLecture = async (req, res, next) => {
  let lectures;
  try {
    lectures = await LectureModel.find();
  } catch (error) {
    console.log(error);
  }
  if (!lectures) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(lectures);
};
//add
const addLecture = async (req, res, next) => {
  const {
    year,
    semester,
    topic,
    subject,
    date,
    time,
    discription,
    meeting_link,
    slide,
    tutorial,
  } = req.body;
  let lecture;
  try {
    lecture = new LectureModel({
      year,
      semester,
      topic,
      subject,
      date,
      time,
      discription,
      meeting_link,
      slide,
      tutorial,
    });
    await lecture.save();
  } catch (error) {
    console.log(error);
  }
  if (!lecture) {
    return res.status(500).json({ message: "unable to add" });
  }
  return res.status(201).json(lecture);
};

//getByid
const getLectureById = async (req, res, next) => {
  const id = req.params.id;
  let lecture;
  try {
    lecture = await LectureModel.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!lecture) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(lecture);
};
//delete
const DeleteLecture = async (req, res, next) => {
  const id = req.params.id;
  let lecture;
  try {
    lecture = await LectureModel.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!lecture) {
    return res.status(404).json({ message: "cannot delete" });
  }
  return res.status(200).json({ message: `product ${id} deleted` });
};
// //update
// const updateNotice = async(req,res,next)=>{
//     const id= req.params.id;
//     const {faculty,module,topic,notice}=req.body;
//     let notices;
//     try {
//         notices = await NoticeModel.findByIdAndUpdate(id,{
//             faculty,module,topic,notice
//         })
//         notices = await NoticeModel.save()
//     } catch (error) {
//         console.log(error);
//     }if(!notices){
//         return res.status(404).json({message:"cannot update"});
//     }
//     return res.status(200).json({notices});
// }

exports.addLecture = addLecture;
// exports.updateNotice=updateNotice;
exports.DeleteLecture = DeleteLecture;
exports.getLectureById = getLectureById;
exports.getAllLecture = getAllLecture;
