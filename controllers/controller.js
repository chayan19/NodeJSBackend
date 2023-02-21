// @description         Get all bootcamps
// @route               GET /api/v1/bootcamps
// @access              Public

exports.getBootcamps = (req , res, next) => {
    res.status(200).json({success: true , msg: 'Get all bootcamps available'});
};

// @description         Get a single bootcamps
// @route               GET /api/v1/bootcamps/:id
// @access              Public

exports.getBootcamp = (req , res, next) => {
    res.status(200).json({success: true , msg: 'Get all bootcamps available'});
};

// @description         Create a bootcamps
// @route               POST /api/v1/bootcamps
// @access              Private

exports.createBootcamps = (req , res, next) => {
    res.status(200).json({success: true , msg: 'Create new bootcamp'});
};

// @description         Update a bootcamps
// @route               PUT /api/v1/bootcamps/:id
// @access              Private

exports.updateBootcamp = (req , res, next) => {
    res.status(200).json({success: true , msg: `Display boot camps as ${req.params.id}`});
};

// @description         DELETE a bootcamps
// @route               PUT /api/v1/bootcamps/:id
// @access              Private

exports.deleteBootcamp = (req , res, next) => {
    res.status(200).json({success: true , msg: `Delete boot camps as ${req.params.id}`});
};

