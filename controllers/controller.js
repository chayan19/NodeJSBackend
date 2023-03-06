const errorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/asyncHandler');
// fetch the Model
const BootCModel = require('../models/Bootcamp');

// @description         Get all bootcamps
// @route               GET /api/v1/bootcamps
// @access              Public

exports.getBootcamps = async (req , res, next) => {
    try {
        const bootcamps = await BootCModel.find();
        res.status(200).json({success: true, data: bootcamps});
    } catch (error) {
        res.status(400).json({success: false, data:error.message});
    }
};


// @description         Get all bootcamps within a radius
// @route               GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access              Public

exports.getBootcampsinradius = async (req , res, next) => {
    try {
        const {zipcode , distance } =  req.params;
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude; 
        const long = loc[0].longitude;
        
        //Earth Radius = 3963 mi

        const radius = distance / 3963;

        const result = await BootCModel.find({
            location: { $geoWithin:{$centerSphere: [[long , lat] , radius]}}
        });
        res.status(200).json({success: true, count:result.length , data:result});

    } catch (error) {
        res.status(400).json({success: false, data:error.message});
    }
};
// @description         Get a single bootcamps
// @route               GET /api/v1/bootcamps/:id
// @access              Public

exports.getBootcamp = asyncHandler(async(req , res, next) => {
    
     const bootcamps = await BootCModel.findById(req.params.id);
    if (!bootcamps){
        return next(
            new errorResponse(`BootCamp not found: ${req.params.id}`
        )); 
    }
    res.status(200).json({success: true, data: bootcamps});

}); 

// @description         Create a bootcamps
// @route               POST /api/v1/bootcamps
// @access              Private

exports.createBootcamps = async (req , res, next) => {
    try {
        const newBootcamps = await BootCModel.create(req.body);
        {
            res.status(201).json({
                success: true,
                data: newBootcamps
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
    
};

// @description         Update a bootcamps
// @route               PUT /api/v1/bootcamps/:id
// @access              Private

exports.updateBootcamp = async (req , res, next) => {
    try {
        const bootcamp = await BootCModel.findByIdAndUpdate(req.params.id , req.body,{
            new: true,
            runValidators: true 
           });
    
        if (!bootcamp) {
            return res.status(400).json({message: false});
        }
    
        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (error) {
        return res.status(400).json({success: false , message: error.message});
    }
    

    //res.status(200).json({success: true , msg: `Display boot camps as ${req.params.id}`});
};

// @description         DELETE a bootcamps
// @route               PUT /api/v1/bootcamps/:id
// @access              Private

exports.deleteBootcamp = async (req , res, next) => {
    try {
        const bootcamp = await BootCModel.findByIdAndDelete(req.params.id);
    
        if (!bootcamp) {
            return res.status(400).json({message: false});
        }
    
        res.status(200).json({
            success: true,
            data: {} 
        });
    } catch (error) {
        return res.status(400).json({success: false , message: error.message});
    }

};
