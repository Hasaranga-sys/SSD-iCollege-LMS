const express = require('express');
const router = express.Router();
const SubjectController = require('../Controller/SubjectController');

router.get("/",SubjectController.getAllSubject);
router.post("/add",SubjectController.addSubject);

module.exports = router;