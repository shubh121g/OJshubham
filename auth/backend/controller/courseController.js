const express= require ( 'express');
//import {addproblem} from '../services/problemService'
const {addCourse,getCourse,getCourses} = require('../services/courseService') 

const crouter = express.Router();

crouter.get("/", getCourses); 

crouter.post("/" , addCourse);

crouter.get("/:courseId", getCourse);



module.exports = {
crouter
};