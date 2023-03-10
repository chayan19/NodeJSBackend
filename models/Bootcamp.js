const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name  '],
        unique: true,
        trim: true,
        maxlength: [50 , 'Name can not exceed 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true,
        maxlength: [500, 'description can not exceed 50 characters']
    },
    website: {
        //https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)
        ///^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        type: String,
        match: [
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                    'Please use a valid URL'

        ]
    },
    phoneno: {
        type: String,
        maxlength: [20, 'Phone no cannot be more than 50 characters']
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please use a valid EMAIl'

        ]
    },
    address: {
        type: String,
        required: [true, 'Please type an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
            
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    //     formattedAddress: String,
    //     street: String,
    //     city: String,
    //     state: String,
    //     zipcode: String,
    //     country: String
    // },
    // careers: {
    //     type: [String],
    //     required: true,
    //     enum: ['Web', 'mobile', 'UX', 'Data Science', 'Business', 'Other']
    //    },
    averageRating: {
        type: Number,
        min:[1 , 'Rating must be atleast 1'],
        max:[10, 'Rating cannot exceed 10']
    },
    averageCost: Number,
    photo:{
        type: String,
        default: 'no-jpg', 
    },
    housing:{
        type: Boolean,
        default: false,
    },
    jobAssistance:{
        type: Boolean,
        default: false,
    },
    jobGurantee:{
        type: Boolean,
        default: false,
    },
    acceptGi:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
     
});



BootcampSchema.pre('save', async function (next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude]
    }
    next();
});
module.exports = mongoose.model('Bootcamp', BootcampSchema);
