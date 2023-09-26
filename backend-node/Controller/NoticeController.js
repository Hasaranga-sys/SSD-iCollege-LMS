const NoticeModel = require("../Model/NoticeModel");
//getAll
const getAllNotices = async (req, res, next) => {
  let notices;
  try {
    notices = await NoticeModel.find();
  } catch (error) {
    console.log(error);
  }
  if (!notices) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ notices });
};
//add
const addNotice = async (req, res, next) => {
  const { faculty, date, topic, notice } = req.body;
  let notices;
  try {
    notices = new NoticeModel({
      faculty,
      date,
      topic,
      notice,
    });
    await notices.save();
  } catch (error) {
    console.log(error);
  }
  if (!notices) {
    return res.status(500).json({ message: "unable to add" });
  }
  return res.status(201).json({ notices });
};
//getByid
const getNoticeById = async (req, res, next) => {
  const id = req.params.id;
  let notices;
  try {
    notices = await NoticeModel.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!notices) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ notices });
};
//delete
const DeleteNotice = async (req, res, next) => {
  const id = req.params.id;
  let notices;
  try {
    notices = await NoticeModel.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!notices) {
    return res.status(404).json({ message: "cannot delete" });
  }
  return res.status(200).json({ message: `product ${id} deleted` });
};
//update
const updateNotice = async (req, res, next) => {
  const id = req.params.id;
  const { faculty, date, topic, notice } = req.body;
  let notices;
  try {
    notices = await NoticeModel.findByIdAndUpdate(id, {
      faculty,
      date,
      topic,
      notice,
    });
    notices = await notices.save();
  } catch (error) {
    console.log(error);
  }
  if (!notices) {
    return res.status(404).json({ message: "cannot update" });
  }
  return res.status(200).json({ notices });
};

exports.addNotice = addNotice;
exports.updateNotice = updateNotice;
exports.DeleteNotice = DeleteNotice;
exports.getNoticeById = getNoticeById;
exports.getAllNotices = getAllNotices;
