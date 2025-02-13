const express = require("express");
const router = express.Router();
const CourseFunc =require("../controllers/courses/CourseFunc")

router.post("/search", CourseFunc.searchCourse);
router.get("/getCourses",CourseFunc.getCourses)
router.get("/getUniversities",CourseFunc.getUniversities)

module.exports = router;
