
const Course = require('../model/Courses')

const getCourses = (async(req,res)=>{
    try{
        console.log(req);
        const allCourses = await Course.find();
        res.status(200).json(allCourses)
    }catch(e){
        res.status(400).json(e);
    }
   

})

const getCourse = (async (req,res)=>{
    const cid = (req.params.courseId);
    try{
        const oneCourse = await Course.findById(cid);
        res.status(200).json(oneCourse);
    }catch(e){
        res.status(400).json(e);
    }
})

const addCourse =(async (req,res)=>{

    console.log("Inside serive function to add Course")
    try {
        const { name, description, price, duration, instructor, datetime } = req.body;
    
        // Validate required fields
        if (!(name && description && price && duration && instructor)) {
          return res.status(400).send("Enter all required fields");
        }
    
        // Check if the course with the same name already exists
        const isCourseExist = await Course.findOne({ name });
        console.log(`${isCourseExist ? isCourseExist.name : ""} is already there`);
        if (isCourseExist) {
          return res.status(400).send("Course name already exists");
        }
    
        // Create course data
        const courseData = await Course.create({
          name,
          description,
          price,
          duration,
          instructor,
          datetime, // Optional; defaults to current date if not provided
        });
    
        console.log(courseData);
        res.status(200).json(courseData);
        return courseData;
    
      } catch (error) {
        console.error("Error in addCourse:", error);
        res.status(500).send("An error occurred while adding the course");
      } 
})

module.exports={
    getCourses,
    getCourse,
    addCourse
}