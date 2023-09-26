const express = require('express');
const router = express.Router();
const NoticeController = require('../Controller/NoticeController');

router.get("/",NoticeController.getAllNotices);
router.post("/",NoticeController.addNotice);
router.get("/:id",NoticeController.getNoticeById);
router.put("/:id",NoticeController.updateNotice);
router.delete("/:id",NoticeController.DeleteNotice);

module.exports=router;