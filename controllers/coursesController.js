const CourseModel = require('../models/Course');
const asyncHandler = require('../middleware/asyncHandler');

// @description         Get all bootcamps
// @route               GET /api/v1/bootcamps
// @route               GET /api/v1/bootcamps/:bootcampId/courses
// @access              Public

exports.getCourses = asyncHandler(async(req , res, next) => {
    let query;

    if (req.params.bootcampId){
        query = CourseModel.find({bootcamp: req.params.bootcampId});
    } else {
        query = CourseModel.find();
    }

    const result = await query;
    res.status(200).json({success: true, data: result});

}); 